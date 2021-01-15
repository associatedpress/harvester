import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSchema, submit } from 'js/store/actions/form'
import { Header, Form } from 'js/components'
import { getNotifications } from 'js/store/selectors/notification'

function App(props) {
  const {
    className,
    docId,
    fetchSchema,
    submit,
    schema,
    notifications,
    dirty,
  } = props

  useEffect(() => { fetchSchema({ id: docId }) }, [])

  useEffect(() => {
    window.onbeforeunload = () => dirty ? true : undefined
  }, [dirty])

  return (
    <div className={className}>
      <Header />
      <ul>
        {notifications.map(note => (
          <li key={note.id}>{note.message}</li>
        ))}
      </ul>
      <Form fields={schema.columns} />
      <div>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  )
}

App.propTypes = {
  className: PropTypes.string,
  docId: PropTypes.string,
  fetchSchema: PropTypes.func,
  schema: PropTypes.object,
  notifications: PropTypes.array,
}

App.defaultProps = {
  notifications: [],
}

function mapStateToProps(state) {
  return {
    schema: state.form.schema,
    notifications: getNotifications(state),
    dirty: state.ui.formDirty,
  }
}

export default connect(mapStateToProps, { fetchSchema, submit })(App)
