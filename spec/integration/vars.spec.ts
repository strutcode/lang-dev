import { script } from '../executor'

describe('Variables', () => {
  it('can assign and use variables', () => {
    const res = script('var a = 12')

    expect(res.interpreter.global('a')).toEqual(12)
  })
})
