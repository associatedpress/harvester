export const getFieldSchema = (schema, fieldId) => {
  return schema.columns.find(col => col.id === fieldId)
}
