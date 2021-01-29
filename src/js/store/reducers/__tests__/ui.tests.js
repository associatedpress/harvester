import * as ui from '../ui'
import * as actions from '../../actions/ui'

describe('ui', () => {
  describe('uiReducer', () => {
    describe('initial state', () => {
      // WHEN
      const initial = ui.uiReducer(undefined, { type: '@@INIT' })

      it('should start with loading=false', () => {
        // THEN
        expect(initial.loading).toBe(false)
      })

      it('should start with submitting=false', () => {
        // THEN
        expect(initial.submitting).toBe(false)
      })

      it('should start with formDirty=false', () => {
        // THEN
        expect(initial.formDirty).toBe(false)
      })

      it('should start with formReady=false', () => {
        // THEN
        expect(initial.formReady).toBe(false)
      })

      it('should start with indexLoaded=false', () => {
        // THEN
        expect(initial.indexLoaded).toBe(false)
      })
    })

    describe('action response SET_LOADER', () => {
      it('should set loading=action.payload', () => {
        // GIVEN
        const initial = ui.uiReducer(undefined, { type: '@@INIT' })
        const action = actions.setLoader({ state: true })

        // WHEN
        const newState = ui.uiReducer(initial, action)

        // THEN
        expect(newState.loading).toEqual(action.payload)
      })
    })

    describe('action response SET_SUBMITTING', () => {
      it('should set submitting=action.payload', () => {
        // GIVEN
        const initial = ui.uiReducer(undefined, { type: '@@INIT' })
        const action = actions.setSubmitting({ state: true })

        // WHEN
        const newState = ui.uiReducer(initial, action)

        // THEN
        expect(newState.submitting).toEqual(action.payload)
      })
    })

    describe('action response SET_FORM_DIRTY', () => {
      it('should set formDirty=action.payload', () => {
        // GIVEN
        const initial = ui.uiReducer(undefined, { type: '@@INIT' })
        const action = actions.setFormDirty({ state: true })

        // WHEN
        const newState = ui.uiReducer(initial, action)

        // THEN
        expect(newState.formDirty).toEqual(action.payload)
      })
    })

    describe('action response SET_FORM_READY', () => {
      it('should set formReady=action.payload', () => {
        // GIVEN
        const initial = ui.uiReducer(undefined, { type: '@@INIT' })
        const action = actions.setFormReady({ state: true })

        // WHEN
        const newState = ui.uiReducer(initial, action)

        // THEN
        expect(newState.formReady).toEqual(action.payload)
      })
    })

    describe('action response SET_INDEX_LOADED', () => {
      it('should set indexLoaded=action.payload', () => {
        // GIVEN
        const initial = ui.uiReducer(undefined, { type: '@@INIT' })
        const action = actions.setIndexLoaded({ state: true })

        // WHEN
        const newState = ui.uiReducer(initial, action)

        // THEN
        expect(newState.indexLoaded).toEqual(action.payload)
      })
    })
  })
})
