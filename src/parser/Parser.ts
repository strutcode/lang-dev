import type { Token } from '../lexer'
import type { AstNode } from './AstNode'

export default class Parser {
  public constructor(private tokens: Token[]) {}

  public parse() {
    const ast: AstNode = {
      type: 'Program',
      block: [],
    }

    let index = 0

    while (index < this.tokens.length) {
      const token = this.tokens[index]

      if (token.type === 'operator' && token.value === '<<') {
        index++
        const nextToken = this.tokens[index]

        if (nextToken.type === 'string') {
          ast.block.push({
            type: 'StreamOutputExpression',
            left: {
              type: 'BuiltIn',
              value: 'stdout',
            },
            right: {
              type: 'StringLiteral',
              value: nextToken.value,
            },
          })
        }
      }

      index++
    }

    return ast
  }
}
