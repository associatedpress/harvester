import React from 'react'
import styled from 'styled-components'
import { darkNeutral } from 'js/styles/colors'

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`

export const DownloadLink = styled.a.attrs(props => ({
  alt: 'Download dataset',
  title: 'Download dataset',
  href: `/${props.formType}/${props.formId}/export.csv`,
}))`
  width: 24px;
  height: 24px;
  margin-left: 12px;
  color: ${darkNeutral};
`

export const DownloadIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    enableBackground='new 0 0 24 24'
    viewBox='0 0 24 24'
    fill='currentColor'
    width='100%'
    height='100%'
  >
    <g>
      <rect fill='none' height='24' width='24' />
    </g>
    <g>
      <path d='M12,2C6.49,2,2,6.49,2,12s4.49,10,10,10s10-4.49,10-10S17.51,2,12,2z M11,10V6h2v4h3l-4,4l-4-4H11z M17,17H7v-2h10V17z' />
    </g>
  </svg>
)
