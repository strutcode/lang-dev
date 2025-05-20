type Nodes = {
  Program: {
    type: 'Program'
    block: AstNode[]
  }

  ExpressionStatement: {
    type: 'ExpressionStatement'
    expression: AstNode
  }

  BinaryExpression: {
    type: 'BinaryExpression'
    operator: '+' | '-' | '*' | '/' | '==' | '!=' | '<' | '<=' | '>' | '>='
    left: Nodes['ValueType']
    right: Nodes['ValueType']
  }

  UnaryExpression: {
    type: 'UnaryExpression'
    operator: '!' | '-'
    right: Nodes['ValueType']
  }

  StringLiteral: {
    type: 'StringLiteral'
    value: string
  }

  NumericLiteral: {
    type: 'NumericLiteral'
    value: number
  }

  Identifier: {
    type: 'Identifier'
    value: string
  }

  BuiltIn: {
    type: 'BuiltIn'
    value: 'stdin' | 'stdout' | 'stderr'
  }

  ExpressionType: Nodes['BinaryExpression'] | Nodes['UnaryExpression']

  ValueType:
    | Nodes['ExpressionType']
    | Nodes['StringLiteral']
    | Nodes['NumericLiteral']
    | Nodes['Identifier']

  StreamOutputExpression: {
    type: 'StreamExpression'
    operator: '<<' | '>>'
    left: Nodes['BuiltIn'] | null
    right: Nodes['ValueType']
  }
}

export type AstNode = Nodes[keyof Nodes]
