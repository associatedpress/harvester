import {
  SET_LOADER,
  SET_SUBMITTING,
  SET_FORM_DIRTY,
  SET_FORM_READY,
  SET_INDEX_LOADED,
  SET_FINISHED
} from '../actions/ui'

const initState = {
  loading: false,
  submitting: false,
  formDirty: false,
  formReady: false,
  indexLoaded: false,
  finished: false,
}

export const uiReducer = (ui = initState, action) => {
  switch (true) {
    case action.type.includes(SET_LOADER):
      return { ...ui, loading: action.payload }

    case action.type.includes(SET_SUBMITTING):
      return { ...ui, submitting: action.payload }

    case action.type.includes(SET_FORM_DIRTY):
      return { ...ui, formDirty: action.payload }

    case action.type.includes(SET_FORM_READY):
      return { ...ui, formReady: action.payload }

    case action.type.includes(SET_INDEX_LOADED):
      return { ...ui, indexLoaded: action.payload }

    case action.type.includes(SET_FINISHED):
      return { ...ui, finished: action.payload }

    default:
      return ui
  }
}
