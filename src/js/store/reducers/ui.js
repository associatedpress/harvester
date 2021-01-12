import { SET_LOADER, SET_SUBMITTING, SET_FORM_DIRTY, SET_FORM_READY } from '../actions/ui'

const initState = {
  loading: false,
  submitting: false,
  formDirty: false,
  formReady: false,
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

    default:
      return ui
  }
}
