import { script } from '../executor'

describe('Variables', () => {
  it.todo('can assign and use variables', () => {
    const res = script('var a: 12')

    expect(res.local('a')).toEqual(12)
  })
})
