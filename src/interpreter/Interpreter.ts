import type { AstNode } from '../parser'

export default class Interpreter {
  public constructor(private ast: AstNode) {}

  public interpret() {
    return this.interpretNode(this.ast)
  }

  private interpretNode(node: AstNode): any {
    switch (node.type) {
      case 'Program':
        let value
        for (const childNode of node.block) {
          value = this.interpretNode(childNode)
        }
        return value
      case 'StreamExpression':
        return this.handleStream(node)
      case 'BinaryExpression':
        return this.binaryExpression(node)
      case 'NumericLiteral':
      case 'StringLiteral':
        return node.value
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  }

  private binaryExpression(node: any): any {
    const left = this.interpretNode(node.left)
    const right = this.interpretNode(node.right)

    switch (node.operator) {
      case '+':
        return left + right
      case '-':
        return left - right
      case '*':
        return left * right
      case '/':
        return left / right
      case '==':
        return left === right
      case '!=':
        return left !== right
      case '<':
        return left < right
      case '<=':
        return left <= right
      case '>':
        return left > right
      case '>=':
        return left >= right
      default:
        throw new Error(`Unknown operator: ${node.operator}`)
    }
  }

  private handleStream(node: any) {
    const left = node.left
    const right = node.right

    if (left.type === 'BuiltIn' && left.value === 'stdout') {
      console.log(this.interpretNode(right))
    }
  }
}
