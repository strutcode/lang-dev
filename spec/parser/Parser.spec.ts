import Parser from '../../src/parser/Parser'

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
          type: 'StreamOutputExpression',
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
})
