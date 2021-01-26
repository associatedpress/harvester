import * as form from '../form'

const formState = (form) => ({ form })
const schemaState = (schema) => formState({ schema })

describe('form', () => {
  describe('getFieldSchema', () => {
    it('should retrieve a column schema by column id', () => {
      // GIVEN
      const fieldId = 1
      const columns =  [
        { id: 0, label: 'Foo' },
        { id: fieldId, label: 'Bar' },
        { id: 2, label: 'Baz' },
      ]
      const state = schemaState({ columns })

      // WHEN
      const fieldSchema = form.getFieldSchema(state, fieldId)

      // THEN
      expect(fieldSchema).toEqual(columns.find(col => col.id === fieldId ))
    })

    it('should return undefined if no column found', () => {
      // GIVEN
      const fieldId = 10
      const columns =  [
        { id: 0, label: 'Foo' },
        { id: 1, label: 'Bar' },
        { id: 2, label: 'Baz' },
      ]
      const state = schemaState({ columns })

      // WHEN
      const fieldSchema = form.getFieldSchema(state, fieldId)

      // THEN
      expect(fieldSchema).toBeUndefined()
    })
  })

  describe('getFieldValue', () => {
    it('should retrieve a field value by field id', () => {
      // GIVEN
      const fieldId = 1
      const fields = { [fieldId]: 10 }
      const state = formState({ fields })

      // WHEN
      const fieldValue = form.getFieldValue(state, fieldId)

      // THEN
      expect(fieldValue).toEqual(fields[fieldId])
    })

    it('should return undefined if no field value found', () => {
      // GIVEN
      const fieldId = 10
      const fields = {}
      const state = formState({ fields })

      // WHEN
      const fieldValue = form.getFieldValue(state, fieldId)

      // THEN
      expect(fieldValue).toBeUndefined()
    })
  })

  describe('getRelativeSchema', () => {
    it('should retrieve a relative schema by relative id', () => {
      // GIVEN
      const relativeId = 'albums'
      const columns =  [
        { id: 0, label: 'Foo' },
        { id: 1, label: 'Bar' },
        { id: 2, label: 'Baz' },
      ]
      const relatives = { [relativeId]: columns }
      const state = schemaState({ relatives })

      // WHEN
      const relativeSchema = form.getRelativeSchema(state, relativeId)

      // THEN
      expect(relativeSchema).toEqual(relatives[relativeId])
    })

    it('should return undefined if no relative found', () => {
      // GIVEN
      const relativeId = 'albums'
      const relatives = {}
      const state = schemaState({ relatives })

      // WHEN
      const relativeSchema = form.getRelativeSchema(state, relativeId)

      // THEN
      expect(relativeSchema).toBeUndefined()
    })
  })

  describe('getFieldIdByKey', () => {
    it('should retrieve a column id by column key', () => {
      // GIVEN
      const fieldKey = 'artist'
      const columns =  [
        { id: 0, label: 'Foo', config: {} },
        { id: 1, label: 'Bar', config: { key: fieldKey } },
        { id: 2, label: 'Baz', config: {} },
      ]
      const state = schemaState({ columns })

      // WHEN
      const fieldId = form.getFieldIdByKey(state, fieldKey)

      // THEN
      expect(fieldId).toEqual(columns.find(col => col.config.key === fieldKey ).id)
    })

    it('should return undefined if no column found', () => {
      // GIVEN
      const fieldKey = 'artist'
      const columns =  [
        { id: 0, label: 'Foo', config: {} },
        { id: 1, label: 'Bar', config: {} },
        { id: 2, label: 'Baz', config: {} },
      ]
      const state = schemaState({ columns })

      // WHEN
      const fieldId = form.getFieldIdByKey(state, fieldKey)

      // THEN
      expect(fieldId).toBeUndefined()
    })

    it('should return undefined if no key given', () => {
      // GIVEN
      const fieldKey = null
      const state = {}

      // WHEN
      const fieldId = form.getFieldIdByKey(state, fieldKey)

      // THEN
      expect(fieldId).toBeUndefined()
    })
  })

  describe('getFieldErrors', () => {
    it('should retrieve field errors by field id', () => {
      // GIVEN
      const fieldId = 1
      const errors = { [fieldId]: [{ message: 'hello' }] }
      const state = formState({ errors })

      // WHEN
      const fieldErrors = form.getFieldErrors(state, fieldId)

      // THEN
      expect(fieldErrors).toEqual(errors[fieldId])
    })

    it('should return undefined if no field errors found', () => {
      // GIVEN
      const fieldId = 10
      const errors = {}
      const state = formState({ errors })

      // WHEN
      const fieldErrors = form.getFieldErrors(state, fieldId)

      // THEN
      expect(fieldErrors).toBeUndefined()
    })
  })

  describe('getFieldLoadedOptions', () => {
    it('should retrieve field loaded options by field id', () => {
      // GIVEN
      const fieldId = 1
      const loaded = { [fieldId]: [{ value: 'hello' }] }
      const state = formState({ options: { loaded } })

      // WHEN
      const fieldLoadedOptions = form.getFieldLoadedOptions(state, fieldId)

      // THEN
      expect(fieldLoadedOptions).toEqual(loaded[fieldId])
    })

    it('should return undefined if no field errors found', () => {
      // GIVEN
      const fieldId = 10
      const loaded = {}
      const state = formState({ options: { loaded } })

      // WHEN
      const fieldLoadedOptions = form.getFieldLoadedOptions(state, fieldId)

      // THEN
      expect(fieldLoadedOptions).toBeUndefined()
    })
  })

  describe('getFieldCreatedOptions', () => {
    it('should retrieve field created options by field id', () => {
      // GIVEN
      const fieldId = 1
      const created = { [fieldId]: [{ value: 'hello' }] }
      const state = formState({ options: { created } })

      // WHEN
      const fieldCreatedOptions = form.getFieldCreatedOptions(state, fieldId)

      // THEN
      expect(fieldCreatedOptions).toEqual(created[fieldId])
    })

    it('should return undefined if no field errors found', () => {
      // GIVEN
      const fieldId = 10
      const created = {}
      const state = formState({ options: { created } })

      // WHEN
      const fieldCreatedOptions = form.getFieldCreatedOptions(state, fieldId)

      // THEN
      expect(fieldCreatedOptions).toBeUndefined()
    })
  })
})
