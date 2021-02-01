import * as form from '../form'

describe('form', () => {
  describe('fetchSchema', () => {
    it(`should create a ${form.FETCH_SCHEMA} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.fetchSchema(options)

      // THEN
      expect(action.type).toEqual(form.FETCH_SCHEMA)
    })

    it(`should create include ${form.FORM} as the feature in action meta`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.fetchSchema(options)

      // THEN
      expect(action.meta.feature).toEqual(form.FORM)
    })

    it('should use id as action payload', () => {
      // GIVEN
      const options = {
        id: '12345',
      }

      // WHEN
      const action = form.fetchSchema(options)

      // THEN
      expect(action.payload).toEqual(options.id)
    })
  })

  describe('setSchema', () => {
    it(`should create a ${form.SET_SCHEMA} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.setSchema(options)

      // THEN
      expect(action.type).toEqual(form.SET_SCHEMA)
    })

    it(`should create include ${form.FORM} as the feature in action meta`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.setSchema(options)

      // THEN
      expect(action.meta.feature).toEqual(form.FORM)
    })

    it('should use schema as action payload', () => {
      // GIVEN
      const options = {
        schema: { headline: 'foo', chatter: 'bar', columns: [] },
      }

      // WHEN
      const action = form.setSchema(options)

      // THEN
      expect(action.payload).toEqual(options.schema)
    })
  })

  describe('inputField', () => {
    it(`should create a ${form.INPUT_FIELD} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.inputField(options)

      // THEN
      expect(action.type).toEqual(form.INPUT_FIELD)
    })

    it(`should create include ${form.FORM} as the feature in action meta`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.inputField(options)

      // THEN
      expect(action.meta.feature).toEqual(form.FORM)
    })

    it('should use value as action payload', () => {
      // GIVEN
      const options = {
        value: '12345',
      }

      // WHEN
      const action = form.inputField(options)

      // THEN
      expect(action.payload).toEqual(options.value)
    })

    it('should include fieldId in action meta', () => {
      // GIVEN
      const options = {
        fieldId: 1,
      }

      // WHEN
      const action = form.inputField(options)

      // THEN
      expect(action.meta.fieldId).toEqual(options.fieldId)
    })
  })

  describe('setField', () => {
    it(`should create a ${form.SET_FIELD} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.setField(options)

      // THEN
      expect(action.type).toEqual(form.SET_FIELD)
    })

    it(`should create include ${form.FORM} as the feature in action meta`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.setField(options)

      // THEN
      expect(action.meta.feature).toEqual(form.FORM)
    })

    it('should use value as action payload', () => {
      // GIVEN
      const options = {
        value: '12345',
      }

      // WHEN
      const action = form.setField(options)

      // THEN
      expect(action.payload).toEqual(options.value)
    })

    it('should include fieldId in action meta', () => {
      // GIVEN
      const options = {
        fieldId: 1,
      }

      // WHEN
      const action = form.setField(options)

      // THEN
      expect(action.meta.fieldId).toEqual(options.fieldId)
    })
  })

  describe('setError', () => {
    it(`should create a ${form.SET_ERROR} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.setError(options)

      // THEN
      expect(action.type).toEqual(form.SET_ERROR)
    })

    it(`should create include ${form.FORM} as the feature in action meta`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.setError(options)

      // THEN
      expect(action.meta.feature).toEqual(form.FORM)
    })

    it('should use errors as action payload', () => {
      // GIVEN
      const options = {
        errors: ['hello world'],
      }

      // WHEN
      const action = form.setError(options)

      // THEN
      expect(action.payload).toEqual(options.errors)
    })

    it('should include fieldId in action meta', () => {
      // GIVEN
      const options = {
        fieldId: 1,
      }

      // WHEN
      const action = form.setError(options)

      // THEN
      expect(action.meta.fieldId).toEqual(options.fieldId)
    })
  })

  describe('validateField', () => {
    it(`should create a ${form.VALIDATE_FIELD} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.validateField(options)

      // THEN
      expect(action.type).toEqual(form.VALIDATE_FIELD)
    })

    it(`should create include ${form.FORM} as the feature in action meta`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.validateField(options)

      // THEN
      expect(action.meta.feature).toEqual(form.FORM)
    })

    it('should use fieldId as action payload', () => {
      // GIVEN
      const options = {
        fieldId: 1,
      }

      // WHEN
      const action = form.validateField(options)

      // THEN
      expect(action.payload).toEqual(options.fieldId)
    })
  })

  describe('validateForm', () => {
    it(`should create a ${form.VALIDATE_FORM} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.validateForm(options)

      // THEN
      expect(action.type).toEqual(form.VALIDATE_FORM)
    })

    it(`should create include ${form.FORM} as the feature in action meta`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.validateForm(options)

      // THEN
      expect(action.meta.feature).toEqual(form.FORM)
    })
  })

  describe('fetchOptions', () => {
    it(`should create a ${form.FETCH_OPTIONS} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.fetchOptions(options)

      // THEN
      expect(action.type).toEqual(form.FETCH_OPTIONS)
    })

    it(`should create include ${form.FORM} as the feature in action meta`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.fetchOptions(options)

      // THEN
      expect(action.meta.feature).toEqual(form.FORM)
    })

    it('should use range as action payload', () => {
      // GIVEN
      const options = {
        range: 'states',
      }

      // WHEN
      const action = form.fetchOptions(options)

      // THEN
      expect(action.payload).toEqual(options.range)
    })

    it('should include fieldId in action meta', () => {
      // GIVEN
      const options = {
        fieldId: 1,
      }

      // WHEN
      const action = form.fetchOptions(options)

      // THEN
      expect(action.meta.fieldId).toEqual(options.fieldId)
    })

    it('should include requires in action meta', () => {
      // GIVEN
      const options = {
        requires: 1,
      }

      // WHEN
      const action = form.fetchOptions(options)

      // THEN
      expect(action.meta.requires).toEqual(options.requires)
    })

    it('should include requireValue in action meta', () => {
      // GIVEN
      const options = {
        requireValue: 1,
      }

      // WHEN
      const action = form.fetchOptions(options)

      // THEN
      expect(action.meta.requireValue).toEqual(options.requireValue)
    })
  })

  describe('createOption', () => {
    it(`should create a ${form.CREATE_OPTION} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.createOption(options)

      // THEN
      expect(action.type).toEqual(form.CREATE_OPTION)
    })

    it(`should create include ${form.FORM} as the feature in action meta`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.createOption(options)

      // THEN
      expect(action.meta.feature).toEqual(form.FORM)
    })

    it('should include option as action payload', () => {
      // GIVEN
      const options = {
        option: 'hello',
      }

      // WHEN
      const action = form.createOption(options)

      // THEN
      expect(action.payload).toEqual(options.option)
    })

    it('should include fieldId in action meta', () => {
      // GIVEN
      const options = {
        fieldId: 1,
      }

      // WHEN
      const action = form.createOption(options)

      // THEN
      expect(action.meta.fieldId).toEqual(options.fieldId)
    })
  })

  describe('submitCreatedOptions', () => {
    it(`should create a ${form.SUBMIT_CREATED_OPTIONS} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.submitCreatedOptions(options)

      // THEN
      expect(action.type).toEqual(form.SUBMIT_CREATED_OPTIONS)
    })

    it(`should create include ${form.FORM} as the feature in action meta`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.submitCreatedOptions(options)

      // THEN
      expect(action.meta.feature).toEqual(form.FORM)
    })

    it('should include options as action payload', () => {
      // GIVEN
      const options = {
        options: ['hello'],
      }

      // WHEN
      const action = form.submitCreatedOptions(options)

      // THEN
      expect(action.payload).toEqual(options.options)
    })

    it('should include fieldId in action meta', () => {
      // GIVEN
      const options = {
        fieldId: 1,
      }

      // WHEN
      const action = form.submitCreatedOptions(options)

      // THEN
      expect(action.meta.fieldId).toEqual(options.fieldId)
    })
  })

  describe('setOptions', () => {
    it(`should create a ${form.SET_OPTIONS} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.setOptions(options)

      // THEN
      expect(action.type).toEqual(form.SET_OPTIONS)
    })

    it(`should create include ${form.FORM} as the feature in action meta`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.setOptions(options)

      // THEN
      expect(action.meta.feature).toEqual(form.FORM)
    })

    it('should include options as action payload', () => {
      // GIVEN
      const options = {
        options: ['hello'],
      }

      // WHEN
      const action = form.setOptions(options)

      // THEN
      expect(action.payload).toEqual(options.options)
    })

    it('should include fieldId in action meta', () => {
      // GIVEN
      const options = {
        fieldId: 1,
      }

      // WHEN
      const action = form.setOptions(options)

      // THEN
      expect(action.meta.fieldId).toEqual(options.fieldId)
    })
  })

  describe('loadIndex', () => {
    it(`should create a ${form.LOAD_INDEX} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.loadIndex(options)

      // THEN
      expect(action.type).toEqual(form.LOAD_INDEX)
    })

    it(`should create include ${form.FORM} as the feature in action meta`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.loadIndex(options)

      // THEN
      expect(action.meta.feature).toEqual(form.FORM)
    })
  })

  describe('submit', () => {
    it(`should create a ${form.SUBMIT} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.submit(options)

      // THEN
      expect(action.type).toEqual(form.SUBMIT)
    })

    it(`should create include ${form.FORM} as the feature in action meta`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.submit(options)

      // THEN
      expect(action.meta.feature).toEqual(form.FORM)
    })
  })

  describe('clear', () => {
    it(`should create a ${form.CLEAR} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.clear(options)

      // THEN
      expect(action.type).toEqual(form.CLEAR)
    })

    it(`should create include ${form.FORM} as the feature in action meta`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = form.clear(options)

      // THEN
      expect(action.meta.feature).toEqual(form.FORM)
    })
  })
})
