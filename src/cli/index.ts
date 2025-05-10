import Interpreter from '../interpreter/Interpreter'
import { Lexer } from '../lexer'
import { Parser } from '../parser'

const argv = Bun.argv.slice(2)

if (argv[0] == 'run') {
  const tokens = new Lexer(argv[1]).tokenize()
  const ast = new Parser(tokens).parse()
  const interpreter = new Interpreter(ast)
  interpreter.interpret()
}
