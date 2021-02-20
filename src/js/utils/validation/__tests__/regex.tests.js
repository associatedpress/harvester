import validate from '../string'

describe('validate', () => {

    it('should return an empty array with no errors', () => {
      // GIVEN
      const schema = {id: 1, label: "Regex test", type: "string", config: {regex: "[A-Z]{2}[0-9]{2,5}"}}
      const inputs = ["NH113"]
  
      inputs.forEach(input => {
        // WHEN
        const output = validate(schema, input)
  
        // THEN
        expect(output).toEqual([])
      })
    })
})

it('should return an array containing an error', () => {
    // GIVEN
    const schema = {id: 1, label: "Regex test", type: "string", config: {regex: "[A-Z]{2}[0-9]{2,5}"}}
    const inputs = ["potatoHB113", "NH 115", "I love the Associated Press", "CA170potato"]

    inputs.forEach(input => {
        // WHEN
        const output = validate(schema, input)
        // THEN
        expect(output).toEqual(["entry does not match specified pattern [A-Z]{2}[0-9]{2,5}"])

  })
})