import * as form from '../form'
import * as actions from '../../actions/form'

describe('form', () => {
  describe('formReducer', () => {
    describe('initial state', () => {
      // WHEN
      const initial = form.formReducer(undefined, { type: '@@INIT' })

      it('should start with id=null', () => {
        // THEN
        expect(initial.form).toEqual({})
      })

      it('should start with schema={}', () => {
        // THEN
        expect(initial.schema).toEqual({})
      })

      it('should start with fields={}', () => {
        // THEN
        expect(initial.fields).toEqual({})
      })

      it('should start with options={ loaded: {}, created: {} }', () => {
        // THEN
        expect(initial.options).toEqual({ loaded: {}, created: {} })
      })
    })

    describe('action response FETCH_SCHEMA', () => {
      it('should set the id', () => {
        // GIVEN
        const initial = form.formReducer(undefined, { type: '@@INIT' })
        const formType = 'd'
        const formId = '12345'
        const action = actions.fetchSchema({ type: formType, id: formId })

        // WHEN
        const newState = form.formReducer(initial, action)

        // THEN
        expect(newState.form.id).toEqual(formId)
        expect(newState.form.type).toEqual(formType)
      })
    })

    describe('action response SET_SCHEMA', () => {
      it('should set the schema', () => {
        // GIVEN
        const initial = form.formReducer(undefined, { type: '@@INIT' })
        const schema = { headline: 'foo', columns: [] }
        const action = actions.setSchema({ schema })

        // WHEN
        const newState = form.formReducer(initial, action)

        // THEN
        expect(newState.schema).toEqual(schema)
      })
    })

    describe('action response SET_FIELD', () => {
      it('should set a field value', () => {
        // GIVEN
        const initial = form.formReducer(undefined, { type: '@@INIT' })
        const fieldId = 1
        const value = 'hello'
        const action = actions.setField({ fieldId, value })

        // WHEN
        const newState = form.formReducer(initial, action)

        // THEN
        expect(newState.fields).toEqual({ [fieldId]: value })
      })
    })

    describe('action response SET_ERROR', () => {
      it('should set a field error set', () => {
        // GIVEN
        const initial = form.formReducer(undefined, { type: '@@INIT' })
        const fieldId = 1
        const errors = ['hello']
        const action = actions.setError({ fieldId, errors })

        // WHEN
        const newState = form.formReducer(initial, action)

        // THEN
        expect(newState.errors).toEqual({ [fieldId]: errors })
      })
    })

    describe('action response SET_OPTIONS', () => {
      it('should set loaded options for a field', () => {
        // GIVEN
        const initial = form.formReducer(undefined, { type: '@@INIT' })
        const fieldId = 1
        const range = 'foo'
        const options = [{ value: 'hello' }]
        const action = actions.setOptions({ range, fieldId, options })

        // WHEN
        const newState = form.formReducer(initial, action)

        // THEN
        expect(newState.options).toEqual({ loaded: {  [range]: options }, created: {} })
      })
    })

    describe('action response CREATE_OPTION', () => {
      it('should create an option for a field', () => {
        // GIVEN
        const initial = form.formReducer(undefined, { type: '@@INIT' })
        const fieldId = 1
        const range = 'foo'
        const option = { value: 'hello' }
        const action = actions.createOption({ range, fieldId, option })

        // WHEN
        const newState = form.formReducer(initial, action)

        // THEN
        expect(newState.options).toEqual({ loaded: {}, created: {  [range]: [option] } })
      })
    })

    describe('action response CLEAR', () => {
      it('should create an option for a field', () => {
        // GIVEN
        const initialState = {
          form: {
            type: 'd',
            id: '12345',
          },
          schema: { headline: 'foo', columns: [] },
          fields: { 0: 'hello', 1: 'world' },
          errors: { 0: ['field is required'] },
          options: {
            loaded: {
              1: [{ value: 'world'}],
            },
            created: {
              1: [{ value: 'moon'}],
            },
          },
        }
        const initial = form.formReducer(initialState, { type: '@@INIT' })
        const action = actions.clear()

        // WHEN
        const newState = form.formReducer(initial, action)

        // THEN
        expect(newState).toEqual({
          form: initialState.form,
          schema: initialState.schema,
          fields: {},
          errors: {},
          options: {
            loaded: {},
            created: {},
          },
        })
      })
    })
  })
})
