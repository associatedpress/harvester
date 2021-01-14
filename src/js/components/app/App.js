import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSchema } from 'js/store/actions/form'
import { Header, Form } from 'js/components'

function App(props) {
  const {
    className,
    docId,
    fetchSchema,
    schema,
  } = props

  useEffect(() => { fetchSchema({ id: docId }) }, [])

  return (
    <div className={className}>
      <Header />
      <Form fields={schema.columns} />
    </div>
  )
}

App.propTypes = {
  className: PropTypes.string,
  docId: PropTypes.string,
  fetchSchema: PropTypes.func,
  schema: PropTypes.object,
}

App.defaultProps = {}

function mapStateToProps(state) {
  return {
    schema: state.form.schema,
  }
}

export default connect(mapStateToProps, { fetchSchema })(App)
