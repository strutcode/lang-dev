import { script } from '../executor'

describe('Variables', () => {
  it('can assign and use variables', () => {
    console.log = vi.fn()

    const { interpreter } = script('var a = 12; << a')

    expect(interpreter.global('a')).toEqual(12)
    expect(console.log).toHaveBeenCalledWith(12)
  })
})
