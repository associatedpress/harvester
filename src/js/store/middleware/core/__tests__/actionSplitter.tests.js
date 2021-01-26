import * as actionSplitter from '../actionSplitter'

describe('actionSplitter', () => {
  describe('actionSplitterMiddleware', () => {
    it('ignores normal actions', () => {
      // GIVEN
      const next = jest.fn()
      const action = { type: '@@INIT' }

      // WHEN
      actionSplitter.actionSplitterMiddleware()(next)(action)

      // THEN
      expect(next).toHaveBeenCalledTimes(1)
      expect(next).toHaveBeenCalledWith(action)
    })

    it('splits arrays of actions', () => {
      // GIVEN
      const next = jest.fn()
      const actions = [
        { type: '@@INIT_0' },
        { type: '@@INIT_1' },
        { type: '@@INIT_2' },
      ]

      // WHEN
      actionSplitter.actionSplitterMiddleware()(next)(actions)

      // THEN
      expect(next).toHaveBeenCalledTimes(actions.length)
      actions.forEach(action => {
        expect(next).toHaveBeenCalledWith(action)
      })
    })
  })
})
