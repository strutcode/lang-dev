import Parser from '../../../src/parser/Parser'

describe('Parser', () => {
  it('can parse hello world', () => {
    const tokens = [
      { type: 'operator', value: '<<' },
      { type: 'string', value: 'Hello world!' },
    ]
    const parser = new Parser(tokens)
    const ast = parser.parse()

    expect(ast).toEqual({
      type: 'Program',
      block: [
        {
          type: 'StreamExpression',
          operator: '<<',
          left: {
            type: 'BuiltIn',
            value: 'stdout',
          },
          right: {
            type: 'StringLiteral',
            value: 'Hello world!',
          },
        },
      ],
    })
  })

  it('can parse long form hello world', () => {
    const tokens = [
      { type: 'identifier', value: 'stdout' },
      { type: 'operator', value: '<<' },
      { type: 'string', value: 'Hello world!' },
    ]
    const parser = new Parser(tokens)
    const ast = parser.parse()

    expect(ast).toEqual({
      type: 'Program',
      block: [
        {
          type: 'StreamExpression',
          operator: '<<',
          left: {
            type: 'BuiltIn',
            value: 'stdout',
          },
          right: {
            type: 'StringLiteral',
            value: 'Hello world!',
          },
        },
      ],
    })
  })

  it('implements operator precedence', () => {
    const tokens = [
      { type: 'number', value: '1' },
      { type: 'operator', value: '*' },
      { type: 'number', value: '2' },
      { type: 'operator', value: '-' },
      { type: 'number', value: '3' },
      { type: 'operator', value: '+' },
      { type: 'number', value: '4' },
    ]
    const parser = new Parser(tokens)
    const ast = parser.parse()

    expect(ast).toEqual({
      type: 'Program',
      block: [
        {
          type: 'BinaryExpression',
          operator: '+',
          left: {
            type: 'BinaryExpression',
            operator: '-',
            left: {
              type: 'BinaryExpression',
              operator: '*',
              left: { type: 'NumericLiteral', value: 1 },
              right: { type: 'NumericLiteral', value: 2 },
            },
            right: { type: 'NumericLiteral', value: 3 },
          },
          right: { type: 'NumericLiteral', value: 4 },
        },
      ],
    })
  })
})
