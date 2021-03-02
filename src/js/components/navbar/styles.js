import React from 'react'
import styled from 'styled-components'
import { copy, bold } from 'js/styles/fonts'
import { gridGap } from 'js/styles/containers'
import apLogo from 'images/ap_logo.png'

export const Nav = styled.header`
  display: grid;
  grid-template-columns: var(--ap-logo-size) 1fr 1fr;
  grid-template-rows: auto;
  align-items: center;
  font-size: 1.8em;
  ${gridGap}
`

export const Logo = styled.img.attrs(props => ({ src: props.logo || apLogo }))`
  width: var(--ap-logo-size);
`

export const Brand = styled.div`
  font-family: ${bold};
  font-weight: bold;
`

export const User = styled.div`
  font-family: ${copy};
  font-size: 0.5em;
  display: flex;
  align-items: center;
  justify-self: end;
`

const UserButton = styled.a`
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  margin-left: 12px;
`

export const LogInLink = styled(UserButton).attrs(props => ({
  alt: 'Sign in',
  title: 'Sign in',
  href: `/auth/sign-in${props.q || ''}`,
}))`
	color: inherit;
`

export const LogOutLink = styled(UserButton).attrs(props => ({
  alt: 'Sign out',
  title: 'Sign out',
  href: `/auth/sign-out${props.q || ''}`,
}))`
	color: inherit;
`

export const LogInIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    enableBackground='new 0 0 24 24'
    viewBox='0 0 24 24'
    fill='currentColor'
    width='100%'
    height='100%'
  >
    <g>
      <rect fill='none' height='24' width='24'/>
    </g>
    <g>
      <path d='M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z' />
    </g>
  </svg>
)

export const LogOutIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    width='100%'
    height='100%'
  >
    <path d='M0 0h24v24H0z' fill='none' />
    <path d='M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z' />
  </svg>
)
