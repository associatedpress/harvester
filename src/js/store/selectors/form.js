export const getFieldSchema = (state, fieldId) => {
  return state.form.schema.columns.find(col => `${col.id}` === `${fieldId}`)
}

export const getFieldValue = (state, fieldId) => {
  return state.form.fields[fieldId]
}

export const getRelativeSchema = (state, relative) => {
  return state.form.schema.relatives[relative]
}

export const getFieldIdByKey = (state, key) => {
  if (!key) return
  const col = state.form.schema.columns.find(c => c.config.key === key)
  return col && col.id
}

export const getFieldErrors = (state, fieldId) => {
  return state.form.errors[fieldId]
}

export const getFieldLoadedOptions = (state, range) => {
  return state.form.options.loaded[range]
}

export const getFieldCreatedOptions = (state, range) => {
  return state.form.options.created[range]
}
