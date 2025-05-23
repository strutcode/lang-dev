import { Interpreter } from '../../../src/interpreter'
import { AstNode } from '../../../src/parser'

describe('Interpreter', () => {
  it('can interpret hello world', () => {
    const ast = {
      type: 'Program',
      block: [
        {
          type: 'StreamExpression',
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
          type: 'StreamExpression',
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

  it('can interpret a variable assignment', () => {
    // << "Hello " + (40 + 2)
    const ast = {
      type: 'Program',
      block: [
        {
          type: 'AssignmentStatement',
          operator: '=',
          dataType: 'i32',
          left: {
            type: 'Identifier',
            value: 'x',
          },
          right: {
            type: 'NumericLiteral',
            value: 2,
          },
        },
      ],
    } as AstNode

    console.log = vi.fn()

    const interpreter = new Interpreter(ast)
    interpreter.interpret()

    expect(interpreter.globals).toHaveProperty('x', 2)
  })

  it('can interpret variable reassignment', () => {
    // << "Hello " + (40 + 2)
    const ast = {
      type: 'Program',
      block: [
        {
          type: 'AssignmentStatement',
          operator: '=',
          dataType: 'i32',
          left: {
            type: 'Identifier',
            value: 'x',
          },
          right: {
            type: 'NumericLiteral',
            value: 2,
          },
        },
        {
          type: 'ReassignmentStatement',
          operator: '=',
          left: {
            type: 'Identifier',
            value: 'x',
          },
          right: {
            type: 'NumericLiteral',
            value: 3,
          },
        },
      ],
    } as AstNode

    console.log = vi.fn()

    const interpreter = new Interpreter(ast)
    interpreter.interpret()

    expect(interpreter.globals).toHaveProperty('x', 3)
  })
})
