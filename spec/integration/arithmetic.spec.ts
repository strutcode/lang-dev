import { script } from '../executor'

describe('Arithmetic', () => {
  it('can add numbers', () => {
    const res = script('1 + 2')

    expect(res).toEqual(3)
  })

  it('can subtract numbers', () => {
    const res = script('5 - 2')

    expect(res).toEqual(3)
  })

  it('can multiply numbers', () => {
    const res = script('2 * 3')

    expect(res).toEqual(6)
  })

  it('can divide numbers', () => {
    const res = script('6 / 2')

    expect(res).toEqual(3)
  })

  it('can use parentheses to change precedence', () => {
    const res = script('(1 + 2) * (3 - 1)')

    expect(res).toEqual(6)
  })
})
