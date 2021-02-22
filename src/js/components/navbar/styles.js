import styled from 'styled-components'
import { copy, bold } from 'js/styles/fonts'
import { lightHighlight, darkPrimary } from 'js/styles/colors'
import login from './login.svg'
import logout from './logout.svg'

export const Nav = styled.nav`
  background-color: ${darkPrimary};
  padding: 0.4rem 1rem;
  font-size: 1.8em;
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

export const Brand = styled.div`
  font-family: ${bold};
  color: ${lightHighlight};
`

export const User = styled.div`
  font-family: ${copy};
  font-size: 0.6em;
  color: ${lightHighlight};
  display: flex;
  align-items: center;
`

export const LogIn = styled.a.attrs(props => ({
  alt: 'Sign in',
  title: 'Sign in',
  href: `/auth/sign-in${props.q || ''}`,
}))`
  width: 24px;
  height: 24px;
  background-image: url("${login}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  margin-left: 12px;
`

export const LogOut = styled.a.attrs(props => ({
  alt: 'Sign out',
  title: 'Sign out',
  href: `/auth/sign-out${props.q || ''}`,
}))`
  width: 24px;
  height: 24px;
  background-image: url("${logout}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  margin-left: 12px;
`
