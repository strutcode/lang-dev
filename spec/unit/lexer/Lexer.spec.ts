import { Lexer } from '../../../src/lexer'

describe('Lexer', () => {
  it('should tokenize hello world', () => {
    expect(new Lexer('<< "Hello world!"').tokenize()).toEqual([
      { type: 'operator', value: '<<' },
      { type: 'string', value: 'Hello world!' },
    ])
  })
})
