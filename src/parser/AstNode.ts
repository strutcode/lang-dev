type Nodes = {
  Program: {
    type: 'Program'
    block: AstNode[]
  }

  ExpressionStatement: {
    type: 'ExpressionStatement'
    expression: AstNode
  }

  StringLiteral: {
    type: 'StringLiteral'
    value: string
  }

  Identifier: {
    type: 'Identifier'
    value: string
  }

  BuiltIn: {
    type: 'BuiltIn'
    value: 'stdin' | 'stdout' | 'stderr'
  }

  StreamOutputExpression: {
    type: 'StreamOutputExpression'
    left: Nodes['BuiltIn'] | null
    right: Nodes['StringLiteral'] | Nodes['Identifier']
  }
}

export type AstNode = Nodes[keyof Nodes]
