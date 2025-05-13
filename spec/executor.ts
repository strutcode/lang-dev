import { Interpreter } from '../src/interpreter'
import { Lexer } from '../src/lexer'
import { Parser } from '../src/parser'

export function script(source: string) {
  const tokens = new Lexer(source).tokenize()
  const ast = new Parser(tokens).parse()
  return new Interpreter(ast).interpret()
}
