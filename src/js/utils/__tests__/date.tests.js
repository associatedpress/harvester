import * as date from '../date'

describe('date', () => {
  describe('formatDate', () => {
    it('should return null with no date', () => {
      // GIVEN
      const inputs = [null, undefined, '', false]

      inputs.forEach(input => {
        // WHEN
        const output = date.formatDate(input)

        // THEN
        expect(output).toBeNull()
      })
    })

    it('should format a date as mm/dd/yyyy', () => {
      // GIVEN
      const input = new Date('01/01/2000')

      // WHEN
      const output = date.formatDate(input)

      // THEN
      expect(output).toEqual('01/01/2000')
    })
  })
})
