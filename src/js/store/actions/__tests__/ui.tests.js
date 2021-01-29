import * as ui from '../ui'

describe('ui', () => {
  describe('setLoader', () => {
    it(`should create a ${ui.SET_LOADER} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = ui.setLoader(options)

      // THEN
      expect(action.type).toMatch(new RegExp(ui.SET_LOADER))
    })

    it('should include the feature in the action type', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = ui.setLoader(options)

      // THEN
      expect(action.type).toEqual(`${options.feature} ${ui.SET_LOADER}`)
    })

    it('should include the state as the action payload', () => {
      // GIVEN
      const options = {
        state: true,
      }

      // WHEN
      const action = ui.setLoader(options)

      // THEN
      expect(action.payload).toEqual(options.state)
    })

    it('should include the feature in the action meta', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = ui.setLoader(options)

      // THEN
      expect(action.meta.feature).toEqual(options.feature)
    })
  })

  describe('setSubmitting', () => {
    it(`should create a ${ui.SET_SUBMITTING} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = ui.setSubmitting(options)

      // THEN
      expect(action.type).toMatch(new RegExp(ui.SET_SUBMITTING))
    })

    it('should include the feature in the action type', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = ui.setSubmitting(options)

      // THEN
      expect(action.type).toEqual(`${options.feature} ${ui.SET_SUBMITTING}`)
    })

    it('should include the state as the action payload', () => {
      // GIVEN
      const options = {
        state: true,
      }

      // WHEN
      const action = ui.setSubmitting(options)

      // THEN
      expect(action.payload).toEqual(options.state)
    })

    it('should include the feature in the action meta', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = ui.setSubmitting(options)

      // THEN
      expect(action.meta.feature).toEqual(options.feature)
    })
  })

  describe('setFormDirty', () => {
    it(`should create a ${ui.SET_FORM_DIRTY} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = ui.setFormDirty(options)

      // THEN
      expect(action.type).toMatch(new RegExp(ui.SET_FORM_DIRTY))
    })

    it('should include the feature in the action type', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = ui.setFormDirty(options)

      // THEN
      expect(action.type).toEqual(`${options.feature} ${ui.SET_FORM_DIRTY}`)
    })

    it('should include the state as the action payload', () => {
      // GIVEN
      const options = {
        state: true,
      }

      // WHEN
      const action = ui.setFormDirty(options)

      // THEN
      expect(action.payload).toEqual(options.state)
    })

    it('should include the feature in the action meta', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = ui.setFormDirty(options)

      // THEN
      expect(action.meta.feature).toEqual(options.feature)
    })
  })

  describe('setFormReady', () => {
    it(`should create a ${ui.SET_FORM_READY} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = ui.setFormReady(options)

      // THEN
      expect(action.type).toMatch(new RegExp(ui.SET_FORM_READY))
    })

    it('should include the feature in the action type', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = ui.setFormReady(options)

      // THEN
      expect(action.type).toEqual(`${options.feature} ${ui.SET_FORM_READY}`)
    })

    it('should include the state as the action payload', () => {
      // GIVEN
      const options = {
        state: true,
      }

      // WHEN
      const action = ui.setFormReady(options)

      // THEN
      expect(action.payload).toEqual(options.state)
    })

    it('should include the feature in the action meta', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = ui.setFormReady(options)

      // THEN
      expect(action.meta.feature).toEqual(options.feature)
    })
  })

  describe('setIndexLoaded', () => {
    it(`should create a ${ui.SET_INDEX_LOADED} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = ui.setIndexLoaded(options)

      // THEN
      expect(action.type).toMatch(new RegExp(ui.SET_INDEX_LOADED))
    })

    it('should include the feature in the action type', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = ui.setIndexLoaded(options)

      // THEN
      expect(action.type).toEqual(`${options.feature} ${ui.SET_INDEX_LOADED}`)
    })

    it('should include the state as the action payload', () => {
      // GIVEN
      const options = {
        state: true,
      }

      // WHEN
      const action = ui.setIndexLoaded(options)

      // THEN
      expect(action.payload).toEqual(options.state)
    })

    it('should include the feature in the action meta', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = ui.setIndexLoaded(options)

      // THEN
      expect(action.meta.feature).toEqual(options.feature)
    })
  })
})
