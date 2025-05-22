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
})
