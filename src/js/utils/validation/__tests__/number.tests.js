import validate from '../number'

describe('validate', () => {

  it('should return an empty array with no errors', () => {
    // GIVEN
    const schema = {id: 1, label: "Number test", type: "number", config: {max: 10}}
    const inputs = [2, 10]

    inputs.forEach(input => {
      // WHEN
      const output = validate(schema, input)

      // THEN
      expect(output).toEqual([])
    })
  })

  it('should return an array containing max input error', () => {
    // GIVEN
    const schema = {id: 1, label: "Number test", type: "number", config: {max: 4}}

    // WHEN
    const output = validate(schema, 5)

    // THEN
    expect(output).toEqual(["entry must be at most 4"])
  })

  it('should return an array containing min input error', () => {
    // GIVEN
    const schema = {id: 1, label: "Number test", type: "number", config: {min: 10}}

    // WHEN
    const output = validate(schema, 5)

    // THEN
    expect(output).toEqual(["entry must be at least 10"])
  })

  it('should return an array containing max input error', () => {
    // GIVEN
    const schema = {id: 1, label: "Number test", type: "number", config: {max: 0}}

    // WHEN
    const output = validate(schema, 3)

    // THEN
    expect(output).toEqual(["entry must be at most 0"])
  })

  it('should return an array containing min input error', () => {
    // GIVEN
    const schema = {id: 1, label: "Number test", type: "number", config: {min: 0}}

    // WHEN
    const output = validate(schema, -2)

    // THEN
    expect(output).toEqual(["entry must be at least 0"])
  })
})
