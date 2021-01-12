import { SET_LOADER } from '../actions/ui'
import { SET_FORM_DIRTY } from '../actions/ui'
import { SET_FORM_READY } from '../actions/ui'

const initState = {
  loading: false,
  formDirty: false,
  formReady: false,
}

export const uiReducer = (ui = initState, action) => {
  switch (true) {

    case action.type.includes(SET_LOADER):
      return { ...ui, loading: action.payload }

    case action.type.includes(SET_FORM_DIRTY):
      return { ...ui, formDirty: action.payload }

    case action.type.includes(SET_FORM_READY):
      return { ...ui, formReady: action.payload }

    default:
      return ui
  }
}
