import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSchema, submit, loadIndex, inputField, setField, validateField } from 'js/store/actions/form'
import { Navbar, Header, Notifications, Form } from 'js/components'
import { getNotifications } from 'js/store/selectors/notification'
import { Container } from './styles'

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
  const indexKeys = index && index.split('+')
  const indexFields = index && schema.columns.filter(col => indexKeys.includes(col.config.key))
  const indexMissing = index && indexFields.some(col => values[col.id] == null)

  const submitForm = () => {
    const msg = 'Submit data? Please make sure entered data is correct.'
    if (confirm(msg)) {
      submit()
    }
  }

  const loadIndexData = () => {
    const msg = 'Load data for another index? Entered data may be lost'
    if (!dirty || confirm(msg)) {
      loadIndex()
    }
  }

  return (
    <div className={className}>
      <Notifications notifications={notifications} />
      <Navbar />
      <Container>
        <Header />
        {index && (
          <Form
            fields={indexFields}
            controls={[{
              label: 'Search',
              onClick: loadIndexData,
              disabled: indexMissing,
            }]}
            values={values}
            setField={setField}
          />
        )}
        {indexLoaded && (
          <Form
            fields={schema.columns}
            controls={[{ label: 'Submit', onClick: submitForm, primary: true }]}
            values={values}
            errors={errors}
            setField={inputField}
            validateField={validateField}
          />
        )}
      </Container>
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
