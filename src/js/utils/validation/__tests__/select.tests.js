import validate from '../select'

describe('validate', () => {

  it('should return an array containing max select error', () => {
    // GIVEN
    const schema = {id: 1, label: 'test', type: 'select', config: {max:2}}
    const input = ['one','two', 'three']

    // WHEN
    const output = validate(schema, input)

    // THEN
    expect(output).toEqual(['select no more than 2 options'])
  })

  it('should return an array containing min select error', () => {
    // GIVEN
    const schema = {id: 1, label: 'test', type: 'select', config: {min:10}}
    const input = ['one','two', 'three']

    // WHEN
    const output = validate(schema, input)

    // THEN
    expect(output).toEqual(['select at least 10 options'])
  })

})
