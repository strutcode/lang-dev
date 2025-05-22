import { Lexer } from '../../../src/lexer'

describe('Lexer', () => {
  it('should tokenize hello world', () => {
    expect(new Lexer('<< "Hello world!"').tokenize()).toEqual([
      { type: 'operator', value: '<<' },
      { type: 'string', value: 'Hello world!' },
    ])
  })

  it('should handle multiple statements', () => {
    const source = `
      << "Hello world!"
      << 'Hello again!'
`
    expect(new Lexer(source).tokenize()).toEqual([
      { type: 'operator', value: '<<' },
      { type: 'string', value: 'Hello world!' },
      { type: 'separator', value: '\n' },
      { type: 'operator', value: '<<' },
      { type: 'string', value: 'Hello again!' },
    ])
  })

  it('can handle variable assignment', () => {
    const source = `
      u32 x = 42
      var y = x + 1
    `

    expect(new Lexer(source).tokenize()).toEqual([
      { type: 'identifier', value: 'u32' },
      { type: 'identifier', value: 'x' },
      { type: 'operator', value: '=' },
      { type: 'number', value: '42' },
      { type: 'separator', value: '\n' },
      { type: 'identifier', value: 'var' },
      { type: 'identifier', value: 'y' },
      { type: 'operator', value: '=' },
      { type: 'identifier', value: 'x' },
      { type: 'operator', value: '+' },
      { type: 'number', value: '1' },
    ])
  })
})
