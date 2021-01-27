import * as form from '../form'
import * as actions from '../../../actions/form'
import * as apiActions from '../../../actions/api'
import * as uiActions from '../../../actions/ui'
import * as notificationActions from '../../../actions/notification'
import { actionSplitterMiddleware } from '../../core/actionSplitter'

describe('form', () => {
  describe('formMiddleware', () => {
    it('should ignore irrelevant actions', () => {
      // GIVEN
      const next = jest.fn()
      const action = { type: '@@INIT' }

      // WHEN
      form.formMiddleware()(next)(action)

      // THEN
      expect(next.mock.calls.length).toBe(1)
      expect(next).toHaveBeenCalledWith(action)
    })

    it('should trigger API request and loading UI on FETCH_SCHEMA', () => {
      // GIVEN
      const next = jest.fn()
      const splitNext = actionSplitterMiddleware()(next)
      const action = actions.fetchSchema({ id: '12345' })

      // WHEN
      form.formMiddleware()(splitNext)(action)

      // THEN
      expect(next.mock.calls.length).toEqual(3)
      expect(next.mock.calls[0][0]).toEqual(action)
      expect(next.mock.calls[1][0].type).toMatch(apiActions.API_REQUEST)
      expect(next.mock.calls[2][0].type).toMatch(uiActions.SET_LOADER)
      expect(next.mock.calls[2][0].payload).toBe(true)
    })

    it('should handle API_SUCCESS', () => {
      // TODO
    })

    it('should set notification and loading UI on API_ERROR', () => {
      // GIVEN
      const next = jest.fn()
      const splitNext = actionSplitterMiddleware()(next)
      const action = apiActions.apiError({
        error: { message: 'hello world' },
        feature: actions.FORM,
      })

      // WHEN
      form.formMiddleware()(splitNext)(action)

      // THEN
      expect(next.mock.calls.length).toEqual(3)
      expect(next.mock.calls[0][0]).toEqual(action)
      expect(next.mock.calls[1][0].type).toMatch(notificationActions.SET_NOTIFICATION)
      expect(next.mock.calls[1][0].payload).toEqual(action.payload.message)
      expect(next.mock.calls[2][0].type).toMatch(uiActions.SET_LOADER)
      expect(next.mock.calls[2][0].payload).toBe(false)
    })

    it('should set form dirty and dispatch set field on INPUT_FIELD', () => {
      // GIVEN
      const dispatch = jest.fn()
      const next = jest.fn()
      const splitNext = actionSplitterMiddleware()(next)
      const action = actions.inputField({ fieldId: 0, value: 'hello' })

      // WHEN
      form.formMiddleware({ dispatch })(splitNext)(action)

      // THEN
      expect(next.mock.calls.length).toEqual(2)
      expect(next.mock.calls[0][0]).toEqual(action)
      expect(next.mock.calls[1][0].type).toMatch(uiActions.SET_FORM_DIRTY)
      expect(next.mock.calls[1][0].payload).toBe(true)
      expect(dispatch.mock.calls.length).toEqual(1)
      expect(dispatch.mock.calls[0][0].type).toEqual(actions.SET_FIELD)
      expect(dispatch.mock.calls[0][0].payload).toEqual(action.payload)
      expect(dispatch.mock.calls[0][0].meta.fieldId).toEqual(action.meta.fieldId)
    })

    it('should set requires to null on SET_FIELD', () => {
      // GIVEN
      const state = {
        form: {
          schema: {
            columns: [
              { id: 0, label: 'State', config: { key: 'state' } },
              { id: 1, label: 'County', config: { requires: 'state' } },
            ],
          },
        },
      }
      const getState = () => state
      const next = jest.fn()
      const splitNext = actionSplitterMiddleware()(next)
      const action = actions.setField({ fieldId: 0, value: 'NM' })

      // WHEN
      form.formMiddleware({ getState })(splitNext)(action)

      // THEN
      expect(next.mock.calls.length).toEqual(2)
      expect(next.mock.calls[0][0]).toEqual(action)
      expect(next.mock.calls[1][0].type).toMatch(actions.SET_FIELD)
      expect(next.mock.calls[1][0].payload).toBeNull()
      expect(next.mock.calls[1][0].meta.fieldId).toEqual(1)
    })

    it('should trigger API request on FETCH_OPTIONS', () => {
      // GIVEN
      const state = { form: { id: '12345' } }
      const getState = () => state
      const next = jest.fn()
      const splitNext = actionSplitterMiddleware()(next)
      const action = actions.fetchOptions({ fieldId: 0 })

      // WHEN
      form.formMiddleware({ getState })(splitNext)(action)

      // THEN
      expect(next.mock.calls.length).toEqual(2)
      expect(next.mock.calls[0][0]).toEqual(action)
      expect(next.mock.calls[1][0].type).toMatch(apiActions.API_REQUEST)
    })

    it('should trigger API request on SUBMIT_CREATED_OPTIONS', () => {
      // GIVEN
      const state = {
        form: {
          id: '12345',
          schema: {
            columns: [
              { id: 0, label: 'Type', config: { options: { range: 'types' } } },
            ],
          },
        },
      }
      const getState = () => state
      const next = jest.fn()
      const splitNext = actionSplitterMiddleware()(next)
      const action = actions.submitCreatedOptions({ fieldId: 0, options: ['basic'] })

      // WHEN
      form.formMiddleware({ getState })(splitNext)(action)

      // THEN
      expect(next.mock.calls.length).toEqual(2)
      expect(next.mock.calls[0][0]).toEqual(action)
      expect(next.mock.calls[1][0].type).toMatch(apiActions.API_REQUEST)
    })

    describe('VALIDATE_FIELD', () => {
      it('should set errors on VALIDATE_FIELD', () => {
        // GIVEN
        const state = {
          form: {
            schema: {
              columns: [
                { id: 0, type: 'string', label: 'Name', config: { required: true } },
              ],
            },
            fields: {
              0: null,
            },
          },
        }
        const getState = () => state
        const next = jest.fn()
        const splitNext = actionSplitterMiddleware()(next)
        const action = actions.validateField({ fieldId: 0 })

        // WHEN
        form.formMiddleware({ getState })(splitNext)(action)

        // THEN
        expect(next.mock.calls.length).toEqual(2)
        expect(next.mock.calls[0][0]).toEqual(action)
        expect(next.mock.calls[1][0].type).toMatch(actions.SET_ERROR)
        expect(next.mock.calls[1][0].payload.length).toEqual(1)
        expect(next.mock.calls[1][0].meta.fieldId).toEqual(0)
      })

      it('should clear errors on VALIDATE_FIELD', () => {
        // GIVEN
        const state = {
          form: {
            schema: {
              columns: [
                { id: 0, type: 'string', label: 'Name', config: { required: true } },
              ],
            },
            fields: {
              0: 'hello',
            },
          },
        }
        const getState = () => state
        const next = jest.fn()
        const splitNext = actionSplitterMiddleware()(next)
        const action = actions.validateField({ fieldId: 0 })

        // WHEN
        form.formMiddleware({ getState })(splitNext)(action)

        // THEN
        expect(next.mock.calls.length).toEqual(2)
        expect(next.mock.calls[0][0]).toEqual(action)
        expect(next.mock.calls[1][0].type).toMatch(actions.SET_ERROR)
        expect(next.mock.calls[1][0].payload.length).toEqual(0)
        expect(next.mock.calls[1][0].meta.fieldId).toEqual(0)
      })

      it('should clear errors on VALIDATE_FIELD', () => {
        // GIVEN
        const state = {
          form: {
            schema: {
              columns: [
                { id: 0, type: 'string', label: 'Name', config: {} },
              ],
            },
            fields: {
              0: null,
            },
          },
        }
        const getState = () => state
        const next = jest.fn()
        const splitNext = actionSplitterMiddleware()(next)
        const action = actions.validateField({ fieldId: 0 })

        // WHEN
        form.formMiddleware({ getState })(splitNext)(action)

        // THEN
        expect(next.mock.calls.length).toEqual(2)
        expect(next.mock.calls[0][0]).toEqual(action)
        expect(next.mock.calls[1][0].type).toMatch(actions.SET_ERROR)
        expect(next.mock.calls[1][0].payload.length).toEqual(0)
        expect(next.mock.calls[1][0].meta.fieldId).toEqual(0)
      })
    })

    it('should validate each field on VALIDATE_FORM', () => {
      // GIVEN
      const state = {
        form: {
          schema: {
            columns: [
              { id: 0 },
              { id: 1 },
              { id: 2 },
            ],
          },
        },
      }
      const getState = () => state
      const dispatch = jest.fn()
      const next = jest.fn()
      const splitNext = actionSplitterMiddleware()(next)
      const action = actions.validateForm()

      // WHEN
      form.formMiddleware({ getState, dispatch })(splitNext)(action)

      // THEN
      expect(next.mock.calls.length).toEqual(1)
      expect(next.mock.calls[0][0]).toEqual(action)
      expect(dispatch.mock.calls.length).toEqual(3)
      dispatch.mock.calls.forEach((call, i) => {
        expect(call[0].type).toMatch(actions.VALIDATE_FIELD)
        expect(call[0].payload).toEqual(state.form.schema.columns[i].id)
      })
    })

    it('should trigger API request and loader UI on LOAD_INDEX', () => {
      // GIVEN
      const state = {
        form: {
          schema: {
            index: 'state',
            columns: [
              { id: 0, config: { key: 'state' } },
            ],
          },
          fields: {
            0: 'NM',
          },
        },
      }
      const getState = () => state
      const next = jest.fn()
      const splitNext = actionSplitterMiddleware()(next)
      const action = actions.loadIndex()

      // WHEN
      form.formMiddleware({ getState })(splitNext)(action)

      // THEN
      expect(next.mock.calls.length).toEqual(3)
      expect(next.mock.calls[0][0]).toEqual(action)
      expect(next.mock.calls[1][0].type).toMatch(apiActions.API_REQUEST)
      expect(next.mock.calls[2][0].type).toMatch(uiActions.SET_LOADER)
      expect(next.mock.calls[2][0].payload).toBe(true)
    })

    describe('SUBMIT', () => {
      it('should validate form, trigger API request, and submit created options on SUBMIT', () => {
        // GIVEN
        const state = {
          form: {
            schema: {
              index: 'state',
              columns: [
                { id: 0, config: { key: 'state' } },
              ],
            },
            fields: {
              0: 'NM',
            },
            errors: {},
            options: {
              loaded: {},
              created: {
                0: [{ value: 'DC' }],
              },
            },
          },
        }
        const getState = () => state
        const dispatch = jest.fn()
        const next = jest.fn()
        const splitNext = actionSplitterMiddleware()(next)
        const action = actions.submit()

        // WHEN
        form.formMiddleware({ getState, dispatch })(splitNext)(action)

        // THEN
        expect(dispatch.mock.calls.length).toEqual(2)
        expect(dispatch.mock.calls[0][0].type).toEqual(actions.VALIDATE_FORM)
        expect(dispatch.mock.calls[1][0].type).toEqual(actions.SUBMIT_CREATED_OPTIONS)
        expect(next.mock.calls.length).toEqual(2)
        expect(next.mock.calls[0][0]).toEqual(action)
        expect(next.mock.calls[1][0].type).toMatch(apiActions.API_REQUEST)
      })

      it('should validate form and NOT trigger API request on SUBMIT if errors', () => {
        // GIVEN
        const state = {
          form: {
            schema: {
              index: 'state',
              columns: [
                { id: 0, config: { key: 'state' } },
              ],
            },
            fields: {
              0: null,
            },
            errors: {
              0: ['field is required'],
            },
          },
        }
        const getState = () => state
        const dispatch = jest.fn()
        const next = jest.fn()
        const splitNext = actionSplitterMiddleware()(next)
        const action = actions.submit()

        // WHEN
        form.formMiddleware({ getState, dispatch })(splitNext)(action)

        // THEN
        expect(dispatch.mock.calls.length).toEqual(1)
        expect(dispatch.mock.calls[0][0].type).toEqual(actions.VALIDATE_FORM)
        expect(next.mock.calls.length).toEqual(2)
        expect(next.mock.calls[0][0]).toEqual(action)
        expect(next.mock.calls[1][0].type).toMatch(notificationActions.SET_NOTIFICATION)
      })
    })

    describe('CLEAR', () => {
      it('should reset UI state on CLEAR resetting index if index set', () => {
        // GIVEN
        const state = {
          form: {
            schema: {
              index: 'foo',
            },
          },
        }
        const getState = () => state
        const next = jest.fn()
        const splitNext = actionSplitterMiddleware()(next)
        const action = actions.clear()

        // WHEN
        form.formMiddleware({ getState })(splitNext)(action)

        // THEN
        expect(next.mock.calls.length).toEqual(3)
        expect(next.mock.calls[0][0]).toEqual(action)
        expect(next.mock.calls[1][0]).toEqual(uiActions.setFormDirty({ state: false, feature: actions.FORM }))
        expect(next.mock.calls[2][0]).toEqual(uiActions.setIndexLoaded({ state: false, feature: actions.FORM }))
      })

      it('should reset UI state on CLEAR not resetting index if no index set', () => {
        // GIVEN
        const state = {
          form: {
            schema: {},
          },
        }
        const getState = () => state
        const next = jest.fn()
        const splitNext = actionSplitterMiddleware()(next)
        const action = actions.clear()

        // WHEN
        form.formMiddleware({ getState })(splitNext)(action)

        // THEN
        expect(next.mock.calls.length).toEqual(3)
        expect(next.mock.calls[0][0]).toEqual(action)
        expect(next.mock.calls[1][0]).toEqual(uiActions.setFormDirty({ state: false, feature: actions.FORM }))
        expect(next.mock.calls[2][0]).toEqual(uiActions.setIndexLoaded({ state: true, feature: actions.FORM }))
      })
    })
  })
})
