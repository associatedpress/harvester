import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TextBlock } from 'js/components'
import { TitleContainer, DownloadLink, DownloadIcon } from './styles'

function Header(props) {
  const {
    formType,
    formId,
    headline,
    chatter,
  } = props

  return (
    <div>
      {headline && (
        <TitleContainer>
          <h1>{headline}</h1>
          <DownloadLink formType={formType} formId={formId}>
            <DownloadIcon />
          </DownloadLink>
        </TitleContainer>
      )}
      {chatter && <TextBlock dangerouslySetInnerHTML={{ __html: chatter }} />}
    </div>
  )
}

Header.propTypes = {
  headline: PropTypes.string,
  chatter: PropTypes.string,
  formType: PropTypes.string,
  formId: PropTypes.string,
}

Header.defaultProps = {}

function mapStateToProps(state) {
  return state.form.schema
}

export default connect(mapStateToProps)(Header)
