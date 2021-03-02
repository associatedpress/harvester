import * as serialize from '../serialize'
import * as CSV from 'csv-string'

describe('serialize', () => {
  describe('parseValue', () => {
    it('should return value if not multiple', () => {
      // GIVEN
      const inputs = [null, undefined, '', 'hello']

      inputs.forEach(input => {
        // WHEN
        const output = serialize.parseValue(input)

        // THEN
        expect(output).toEqual(input)
      })
    })

    it('should return empty array if multiple and value is falsey', () => {
      // GIVEN
      const inputs = [null, undefined, false, 0, '']
      const opts = { multiple: true }

      inputs.forEach(input => {
        // WHEN
        const output = serialize.parseValue(input, opts)

        // THEN
        expect(output).toEqual([])
      })
    })

    it('should parse a stringified JSON array if multiple', () => {
      // GIVEN
      const inputs = ['[]', '[1]', '[{"hello": "world"}]']
      const opts = { multiple: true }

      inputs.forEach(input => {
        // WHEN
        const output = serialize.parseValue(input, opts)

        // THEN
        expect(output).toEqual(JSON.parse(input))
      })
    })

    it('should parse a CSV array if multiple and serialization is csv', () => {
      // GIVEN
      const inputs = ['1,2,3', 'hello,world,"my,name"']
      const opts = { multiple: true, serialization: 'csv' }

      inputs.forEach(input => {
        // WHEN
        const output = serialize.parseValue(input, opts)

        // THEN
        expect(output).toEqual(CSV.parse(input)[0])
      })
    })
  })

  describe('serializeValue', () => {
    it('should return value if not multiple', () => {
      // GIVEN
      const inputs = [null, undefined, '', 'hello']

      inputs.forEach(input => {
        // WHEN
        const output = serialize.serializeValue(input)

        // THEN
        expect(output).toEqual(input)
      })
    })

    it('should return null if multiple and value is falsey', () => {
      // GIVEN
      const inputs = [null, undefined, false, 0, '']
      const opts = { multiple: true }

      inputs.forEach(input => {
        // WHEN
        const output = serialize.serializeValue(input, opts)

        // THEN
        expect(output).toBe(null)
      })
    })

    it('should return null if multiple and value is empty array', () => {
      // GIVEN
      const input = []
      const opts = { multiple: true }

      // WHEN
      const output = serialize.serializeValue(input, opts)

      // THEN
      expect(output).toBe(null)
    })

    it('should parse a serialize an array as JSON if multiple', () => {
      // GIVEN
      const inputs = [[1], [{'hello': 'world'}]]
      const opts = { multiple: true }

      inputs.forEach(input => {
        // WHEN
        const output = serialize.serializeValue(input, opts)

        // THEN
        expect(output).toEqual(JSON.stringify(input))
      })
    })

    it('should parse a CSV array if multiple and serialization is csv', () => {
      // GIVEN
      const inputs = [[1, 2, 3], ['hello', 'world', 'my,name']]
      const opts = { multiple: true, serialization: 'csv' }

      inputs.forEach(input => {
        // WHEN
        const output = serialize.serializeValue(input, opts)

        // THEN
        expect(output).toEqual(CSV.stringify(input).trim())
      })
    })
  })
})
