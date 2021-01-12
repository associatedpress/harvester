export const getFieldSchema = (form, fieldId) => {
  return form.schema.columns.find(col => col.id === fieldId)
}
