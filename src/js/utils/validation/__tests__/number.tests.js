import validate from '../number'

describe('validate', () => {

  it('should return an empty array with no errors', () => {
    // GIVEN
    const schema = {id: 1, label: "Number test", type: "number", config: {max: 10}}
    const inputs = [2, 10]

    inputs.forEach(input => {
      // WHEN
      const output = validate(schema, inputs)

      // THEN
      expect(output).toEqual([])
    })
  })

  it('should return an array containing max date error', () => {
    // GIVEN
    const schema = {id: 1, label: "Number test", type: "number", config: {max: 4}}

    // WHEN
    const output = validate(schema, 5)

    // THEN
    expect(output).toEqual(["entry must be 4 or less"])
  })

  it('should return an array containing min date error', () => {
    // GIVEN
    const schema = {id: 1, label: "Number test", type: "number", config: {min: 10}}

    // WHEN
    const output = validate(schema, 5)

    // THEN
    expect(output).toEqual(["entry must be greater than 10"])
  })

})
