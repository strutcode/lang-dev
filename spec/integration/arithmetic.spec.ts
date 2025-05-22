import { script } from '../executor'

describe('Arithmetic', () => {
  it('can add numbers', () => {
    const { result } = script('1 + 2')

    expect(result).toEqual(3)
  })

  it('can subtract numbers', () => {
    const { result } = script('5 - 2')

    expect(result).toEqual(3)
  })

  it('can multiply numbers', () => {
    const { result } = script('2 * 3')

    expect(result).toEqual(6)
  })

  it('can divide numbers', () => {
    const { result } = script('6 / 2')

    expect(result).toEqual(3)
  })

  it('can use parentheses to change precedence', () => {
    const { result } = script('(1 + 2) * (3 - 1)')

    expect(result).toEqual(6)
  })
})
