import type { AstNode } from './AstNode'

export default class Ast {
  public constructor(private nodes: AstNode[]) {}

  public getNodes() {
    return this.nodes
  }

  public addNode(node: AstNode) {
    this.nodes.push(node)
  }
}
