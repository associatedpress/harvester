import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSchema, submit, clear, loadIndex, inputField, setField, validateField } from 'js/store/actions/form'
import { setUser } from 'js/store/actions/user'
import { Layout, Header, Notifications, Form, Finished, ErrorBoundary } from 'js/components'
import { getNotifications } from 'js/store/selectors/notification'
import { Article } from 'js/styles/containers'

function App(props) {
  const {
    version,
    logo,
    user,
    formType,
    formId,
    fetchSchema,
    schema,
    submit,
    loadIndex,
    finished,
    values,
    errors,
    notifications,
    dirty,
    indexLoaded,
    setField,
    inputField,
    validateField,
    clear,
    setUser,
    embed,
  } = props

  useEffect(() => { setUser({ email: user && user.email }) }, []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { fetchSchema({ type: formType, id: formId }) }, []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    window.onbeforeunload = () => dirty ? true : undefined
  }, [dirty])

  const { index, columns = [] } = schema
  const indexKeys = index && index.split('+')
  const indexFields = index && columns.filter(col => indexKeys.includes(col.config.key))
  const indexMissing = index && indexFields.some(col => values[col.id] == null)
  const nonIndexFields = columns.filter(col => !index || !indexKeys.includes(col.config.key))

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

  const setIndexField = (opts) => {
    const msg = 'Updating index value will clear the form. Entered data may be lost'
    if (indexLoaded && dirty) {
      if (!confirm(msg)) return
    }
    if (indexLoaded) {
      clear()
    }
    setField(opts)
  }

  return (
    <Layout logo={logo} user={user} formType={formType} formId={formId} version={version} embed={embed}>
      <Notifications notifications={notifications} />
      <Article>
        <Header formType={formType} formId={formId} />
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div>
              <p>
                Sorry, something went wrong. Please reload the page and try again.
              </p>
              {error && error.message && (
                <p>
                  Error: {error.message}
                </p>
              )}
            </div>
          )}
        >
          {finished ? (
            <Finished />
          ) : (
            <>
              {index && (
                <Form
                  fields={indexFields}
                  controls={[{
                    label: 'Search',
                    onClick: loadIndexData,
                    disabled: indexMissing,
                  }]}
                  values={values}
                  setField={setIndexField}
                />
              )}
              {indexLoaded && (
                <Form
                  fields={nonIndexFields}
                  controls={[{ label: 'Submit', onClick: submitForm, primary: true }]}
                  values={values}
                  errors={errors}
                  setField={inputField}
                  validateField={validateField}
                />
              )}
            </>
          )}
        </ErrorBoundary>
      </Article>
    </Layout>
  )
}

App.propTypes = {
  version: PropTypes.string,
  logo: PropTypes.string,
  user: PropTypes.object,
  formType: PropTypes.string,
  formId: PropTypes.string,
  schema: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  finished: PropTypes.bool,
  fetchSchema: PropTypes.func,
  submit: PropTypes.func,
  loadIndex: PropTypes.func,
  inputField: PropTypes.func,
  setField: PropTypes.func,
  validateField: PropTypes.func,
  notifications: PropTypes.array,
  dirty: PropTypes.bool,
  indexLoaded: PropTypes.bool,
  clear: PropTypes.func,
  setUser: PropTypes.func,
  embed: PropTypes.bool,
}

App.defaultProps = {
  notifications: [],
  embed: false,
}

function mapStateToProps(state) {
  return {
    schema: state.form.schema,
    values: state.form.fields,
    errors: state.form.errors,
    notifications: getNotifications(state),
    dirty: state.ui.formDirty,
    indexLoaded: state.ui.indexLoaded,
    finished: state.ui.finished,
  }
}

export default connect(mapStateToProps, { fetchSchema, submit, clear, loadIndex, setField, inputField, validateField, setUser })(App)
