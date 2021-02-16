import * as date from '../datetime'
import Datetime from 'react-datetime'

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

    it('should format a date as mm/dd/yyyy HH:mm', () => {
      // GIVEN
      const input = Datetime.moment('2021-02-08 09:33')

      // WHEN
      const output = date.formatDate(input)

      // THEN
      expect(output).toEqual('02/08/2021 09:33')
    })
  })
})
