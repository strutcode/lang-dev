import type { Token } from '../lexer'
import type { AstNode } from './AstNode'

export default class Parser {
  private pos = 0

  public constructor(private tokens: Token[]) {}

  public parse() {
    return this.program()
  }

  private get token() {
    return this.tokens[this.pos]
  }

  private get previous() {
    return this.tokens[this.pos - 1]
  }

  private get next() {
    return this.tokens[this.pos + 1]
  }

  private advance() {
    this.pos++
    return this.previous
  }

  private matchType(type: string) {
    if (!this.token) {
      return false
    }

    if (this.token.type != type) {
      return false
    }

    this.advance()
    return true
  }

  private match(type: string) {
    if (!this.token) {
      return () => false
    }

    if (this.token.type != type) {
      return () => false
    }

    return (...values: string[]) => {
      if (values.includes(this.token.value)) {
        this.advance()
        return true
      }

      return false
    }
  }

  private program() {
    const block: AstNode[] = []

    while (this.token) {
      block.push(this.statement())
    }

    return {
      type: 'Program',
      block,
    }
  }

  private statement(): AstNode {
    return this.stream()
  }

  private stream(): AstNode {
    if (this.match('operator')('<<', '>>')) {
      const operator = this.previous.value
      const right = this.expression()

      return {
        type: 'StreamExpression',
        operator,
        left: { type: 'BuiltIn', value: 'stdout' },
        right,
      }
    }

    if (this.next?.type == 'operator' && (this.next.value == '<<' || this.next.value == '>>')) {
      const left = this.primary()
      const operator = this.advance().value
      const right = this.expression()

      return {
        type: 'StreamExpression',
        operator,
        left,
        right,
      }
    }

    return this.expression()
  }

  private expression() {
    return this.equality()
  }

  private equality(): AstNode {
    let left = this.comparison()

    while (this.match('operator')('==', '!=')) {
      const operator = this.previous
      const right = this.comparison()

      left = this.binary(left, operator, right)
    }

    return left
  }

  private comparison(): AstNode {
    let left = this.term()

    while (this.match('operator')('>', '<', '>=', '<=')) {
      const operator = this.previous
      const right = this.term()

      left = this.binary(left, operator, right)
    }

    return left
  }

  private term(): AstNode {
    let left = this.factor()

    while (this.match('operator')('+', '-')) {
      const operator = this.previous
      const right = this.factor()

      left = this.binary(left, operator, right)
    }

    return left
  }

  private factor(): AstNode {
    let left = this.unary()

    while (this.match('operator')('*', '/')) {
      const operator = this.previous
      const right = this.unary()

      left = this.binary(left, operator, right)
    }

    return left
  }

  private binary(left: AstNode, operator: Token, right: AstNode): AstNode {
    return {
      type: 'BinaryExpression',
      operator: operator.value,
      left,
      right,
    }
  }

  private unary(): AstNode {
    while (this.match('operator')('!', '-')) {
      const operator = this.previous
      const right = this.unary()

      return {
        type: 'UnaryExpression',
        operator: operator,
        right,
      }
    }

    return this.primary()
  }

  private primary(): AstNode {
    if (this.matchType('number')) {
      return {
        type: 'NumericLiteral',
        value: parseFloat(this.previous.value),
      }
    }

    if (this.matchType('string')) {
      return {
        type: 'StringLiteral',
        value: this.previous.value,
      }
    }

    if (this.match('identifier')('stdin', 'stdout', 'stderr')) {
      return {
        type: 'BuiltIn',
        value: this.previous.value,
      }
    }

    if (this.matchType('identifier')) {
      return {
        type: 'Identifier',
        value: this.previous.value,
      }
    }

    if (this.match('separator')('(')) {
      const expression = this.expression()

      if (!this.match('separator')(')')) {
        throw new Error(
          `Expected ')' after expression, got ${this.token?.value} (${this.token?.type})`,
        )
      }

      return expression
    }

    throw new Error(`Unexpected token: ${this.token?.value} (${this.token?.type})`)
  }
}
