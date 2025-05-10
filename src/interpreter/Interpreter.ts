import type { AstNode } from '../parser'

export default class Interpreter {
  public constructor(private ast: AstNode) {}

  public interpret() {
    this.interpretNode(this.ast)
  }

  private interpretNode(node: AstNode) {
    if (node.type === 'Program') {
      for (const childNode of node.block) {
        this.interpretNode(childNode)
      }
    } else if (node.type === 'StreamOutputExpression') {
      this.handleStreamOutput(node)
    }
  }

  private handleStreamOutput(node: any) {
    const left = node.left
    const right = node.right

    if (left.type === 'BuiltIn' && left.value === 'stdout') {
      console.log(right.value)
    }
  }
}
