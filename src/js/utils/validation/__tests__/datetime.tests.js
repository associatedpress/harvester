import validate from '../datetime'

describe('validate', () => {

  it('should return an array containing max date error', () => {
    // GIVEN
    const schema = {id: 1, label: "Date and time", type: "datetime", config: {max: "11/5/1955"}}
    const input = new Date('1985-10-26')

    // WHEN
    const output = validate(schema, input)

    // THEN
    expect(output).toEqual(["date must be at most 11/5/1955"])
  })

  it('should return an array containing min date error', () => {
    // GIVEN
    const schema = {id: 1, label: "Date and time", type: "datetime", config: {min: "10/21/2015"}}
    const input = new Date('1985-10-26')

    // WHEN
    const output = validate(schema, input)

    // THEN
    expect(output).toEqual(["date must be at least 10/21/2015"])
  })

})
