import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSchema, submit, loadIndex, inputField, setField, validateField } from 'js/store/actions/form'
import { Header, Notifications, Form } from 'js/components'
import { getNotifications } from 'js/store/selectors/notification'

function App(props) {
  const {
    className,
    docId,
    fetchSchema,
    schema,
    submit,
    loadIndex,
    values,
    errors,
    notifications,
    dirty,
    indexLoaded,
    setField,
    inputField,
    validateField,
  } = props

  useEffect(() => { fetchSchema({ id: docId }) }, [])
  useEffect(() => {
    window.onbeforeunload = () => dirty ? true : undefined
  }, [dirty])

  const { index } = schema
  if (!index) return null

  const indexKeys = index.split('+')
  const indexFields = schema.columns.filter(col => indexKeys.includes(col.config.key))
  const indexMissing = indexFields.some(col => values[col.id] == null)

  return (
    <div className={className}>
      <Notifications notifications={notifications} />
      <Header />
      <Form
        fields={indexFields}
        controls={[{
          label: 'Search',
          onClick: loadIndex,
          disabled: indexMissing,
        }]}
        values={values}
        setField={setField}
      />
      {indexLoaded && (
        <Form
          fields={schema.columns}
          controls={[{ label: 'Submit', onClick: submit }]}
          values={values}
          errors={errors}
          setField={inputField}
          validateField={validateField}
        />
      )}
    </div>
  )
}

App.propTypes = {
  className: PropTypes.string,
  docId: PropTypes.string,
  schema: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  fetchSchema: PropTypes.func,
  submit: PropTypes.func,
  loadIndex: PropTypes.func,
  inputField: PropTypes.func,
  setField: PropTypes.func,
  validateField: PropTypes.func,
  notifications: PropTypes.array,
  dirty: PropTypes.bool,
  indexLoaded: PropTypes.bool,
}

App.defaultProps = {
  notifications: [],
}

function mapStateToProps(state) {
  return {
    schema: state.form.schema,
    values: state.form.fields,
    errors: state.form.errors,
    notifications: getNotifications(state),
    dirty: state.ui.formDirty,
    indexLoaded: state.ui.indexLoaded,
  }
}

export default connect(mapStateToProps, { fetchSchema, submit, loadIndex, setField, inputField, validateField })(App)
