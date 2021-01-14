export const getFieldSchema = (state, fieldId) => {
  return state.form.schema.columns.find(col => col.id === fieldId)
}

export const getFieldValue = (state, fieldId) => {
  return state.form.fields[fieldId]
}

export const getFieldErrors = (state, fieldId) => {
  return state.form.errors[fieldId]
}

export const getFieldOptions = (state, fieldId) => {
  return state.form.options[fieldId]
}
