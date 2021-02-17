import * as datetime from '../datetime'
import Datetime from 'react-datetime'

describe('datetime', () => {
  describe('serializeDateTime', () => {
    it('should return null with no date', () => {
      // GIVEN
      const inputs = [null, undefined, '', false]

      inputs.forEach(input => {
        // WHEN
        const output = datetime.serializeDateTime(input)

        // THEN
        expect(output).toBeNull()
      })
    })

    it('should format a date as mm/dd/yyyy HH:mm', () => {
      // GIVEN
      const input = Datetime.moment('1955-11-05 18:38')

      // WHEN
      const output = datetime.serializeDateTime(input)

      // THEN
      expect(output).toEqual('11/05/1955 18:38')
    })

    it('should format a time only as  HH:mm', () => {
      // GIVEN
      const input = Datetime.moment('1955-11-05 18:38')

      // WHEN
      const output = datetime.serializeDateTime(input, {date:false, time:true})

      // THEN
      expect(output).toEqual('18:38')
    })

    it('should format a date only as mm/dd/yyyy', () => {
      // GIVEN
      const input = Datetime.moment('1955-11-05 18:38')

      // WHEN
      const output = datetime.serializeDateTime(input, {date:true, time:false})

      // THEN
      expect(output).toEqual('11/05/1955')
    })
    
  })

  describe('parseDateTime', () => { 
    it('should return a date object with a dummy date', () => {
      // GIVEN
      const input = '18:38'
      const parsedDate = new Date('1955-11-05 18:38')

      // WHEN
      const output = datetime.parseDateTime(input, {date:false, time:true})

      // THEN
      expect(output).toEqual(parsedDate)
    })

    it('should return a date object', () => {
      // GIVEN
      const input = '1955-11-05'
      const parsedDate = new Date('1955-11-05 18:38')

      // WHEN
      const output = datetime.parseDateTime(input, {date:true, time:true})

      // THEN
      expect(output).toEqual(parsedDate)
    })

    it('should return a date object', () => {
      // GIVEN
      const input = '1955-11-05 18:38'
      const parsedDate = new Date('1955-11-05 18:38')

      // WHEN
      const output = datetime.parseDateTime(input)

      // THEN
      expect(output).toEqual(parsedDate)
    })

    it('should return a date object', () => {
      // GIVEN
      const input = '1955-11-05 18:38'
      const parsedDate = new Date('1955-11-05 18:38')

      // WHEN
      const output = datetime.parseDateTime(input)

      // THEN
      expect(output).toEqual(parsedDate)
    })

    it('should return new date object', () => {
      // GIVEN
      const input = 'today'
      const parsedDate = new Date()

      // WHEN
      const output = datetime.parseDateTime(input)

      // THEN
      expect(output).toEqual(parsedDate)
    })
  })


  describe('formatDateTime', () => {
    it('should return null with no date', () => {
      // GIVEN
      const inputs = [null, undefined, '', false]

      inputs.forEach(input => {
        // WHEN
        const output = datetime.formatDateTime(input)

        // THEN
        expect(output).toBeNull()
      })
    })

    it('should format a date as mm/dd/yyyy', () => {
      // GIVEN
      const input = new Date('01/01/2000')

      // WHEN
      const output = datetime.formatDateTime(input)

      // THEN
      expect(output).toEqual('01/01/2000')
    })
  })
  
})
