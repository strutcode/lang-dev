import type { AstNode } from '../parser'

export default class Interpreter {
  public globals: Record<string, any> = {}

  public constructor(private ast: AstNode) {}

  public global(name: string) {
    if (this.globals[name] === undefined) {
      throw new Error(`Global variable ${name} is not defined`)
    }

    return this.globals[name]
  }

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
      case 'AssignmentStatement':
        return this.assignmentStatement(node)
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

  private assignmentStatement(node: any) {
    const left = node.left
    const right = this.interpretNode(node.right)

    if (node.operator === '=') {
      this.globals[left.value] = right
      return right
    } else {
      throw new Error(`Unknown assignment operator: ${node.operator}`)
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
