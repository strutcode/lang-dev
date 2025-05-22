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

  StatementType: Nodes['AssignmentStatement'] | Nodes['ExpressionStatement']

  AssignmentStatement: {
    type: 'AssignmentStatement'
    operator: '='
    dataType: 'var' | 'u8' | 'u16' | 'u32' | 'u64' | 'i8' | 'i16' | 'i32' | 'i64' | 'f32' | 'f64'
    left: Nodes['Identifier']
    right: Nodes['ValueType']
  }

  StreamExpression: {
    type: 'StreamExpression'
    operator: '<<' | '>>'
    left: Nodes['BuiltIn'] | null
    right: Nodes['ValueType']
  }
}

export type AstNode = Nodes[keyof Nodes]
