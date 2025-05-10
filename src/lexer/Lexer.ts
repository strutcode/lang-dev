const identifierChars = Object.fromEntries(
  [
    // prettier-ignore
    ...['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    ...['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ...['_'],
  ].map(c => [c, true]),
)
const numberChars = Object.fromEntries(
  [
    // prettier-ignore
    ...['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ...['_'],
  ].map(c => [c, true]),
)
const operatorChars = Object.fromEntries(
  [
    // prettier-ignore
    ...['+', '-', '*', '/', '=', '<', '>', '!', '&', '|', '^', '%', '~', '?', '@', '#', '$'],
  ].map(c => [c, true]),
)
const whitespaceChars = Object.fromEntries([...[' ', '\t', '\n', '\r']].map(c => [c, true]))
const separatorChars = Object.fromEntries(
  ['(', ')', '{', '}', '[', ']', ',', ';', ':', '.', '`'].map(c => [c, true]),
)

const isIdentifier = (c: string) => c in identifierChars
const isNumber = (c: string) => c in numberChars
const isOperator = (c: string) => c in operatorChars
const isWhitespace = (c: string) => c in whitespaceChars
const isSeparator = (c: string) => c in separatorChars
const isStringBoundary = (c: string) => c === '"' || c === "'"

export type Token = {
  type: string
  value: string
}

export default class Lexer {
  public constructor(private source: string) {}

  public tokenize() {
    let index = 0

    const tokens: Token[] = []
    const parseToken = (condition: (c: string) => boolean) => {
      let value = this.source[index]
      index++

      while (condition(this.source[index]) && index < this.source.length) {
        if (this.source[index] === '\\') {
          index++
          value += this.source[index]
          index++
          continue
        }

        value += this.source[index]
        index++
      }

      return value
    }

    while (index < this.source.length) {
      const char = this.source[index]

      if (isWhitespace(char)) {
        index++
        continue
      }

      if (isStringBoundary(char)) {
        index++
        tokens.push({ type: 'string', value: parseToken(c => !isStringBoundary(c)) })
        index++
        continue
      }

      if (isIdentifier(char)) {
        tokens.push({ type: 'identifier', value: parseToken(isIdentifier) })
        continue
      }

      if (isNumber(char)) {
        tokens.push({ type: 'number', value: parseToken(isNumber) })
        continue
      }

      if (isOperator(char)) {
        tokens.push({ type: 'operator', value: parseToken(isOperator) })
        continue
      }

      if (isSeparator(char)) {
        tokens.push({ type: 'separator', value: parseToken(isSeparator) })
        continue
      }

      throw new Error(`Unexpected character: ${char} at index ${index}`)
    }

    return tokens
  }
}
