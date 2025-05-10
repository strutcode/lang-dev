import type { ASTNode } from './AstNode'

export default class Ast {
  public constructor(private nodes: ASTNode[]) {}

  public getNodes() {
    return this.nodes
  }

  public addNode(node: ASTNode) {
    this.nodes.push(node)
  }
}
