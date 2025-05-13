import { Interpreter } from '../../../src/interpreter'
import { AstNode } from '../../../src/parser'

describe('Interpreter', () => {
  it('can interpret hello world', () => {
    const ast = {
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
    } as AstNode

    console.log = vi.fn()

    const interpreter = new Interpreter(ast)
    interpreter.interpret()

    expect(console.log).toHaveBeenCalledWith('Hello world!')
  })

  it('can interpret a compound expression', () => {
    // << "Hello " + (40 + 2)
    const ast = {
      type: 'Program',
      block: [
        {
          type: 'StreamOutputExpression',
          left: {
            type: 'BuiltIn',
            value: 'stdout',
          },
          right: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'StringLiteral',
              value: 'Hello ',
            },
            right: {
              type: 'BinaryExpression',
              operator: '+',
              left: {
                type: 'NumericLiteral',
                value: 40,
              },
              right: {
                type: 'NumericLiteral',
                value: 2,
              },
            },
          },
        },
      ],
    } as AstNode

    console.log = vi.fn()

    const interpreter = new Interpreter(ast)
    interpreter.interpret()

    expect(console.log).toHaveBeenCalledWith('Hello 42')
  })
})
