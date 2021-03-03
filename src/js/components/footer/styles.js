import styled from 'styled-components'
import { primary, neutral, darkNeutral } from 'js/styles/colors'
import apLogo from 'images/ap_logo.png'

export const Container = styled.footer`
  min-height: 80px;
  border-top: 1px solid ${neutral};
`

export const Logo = styled.img.attrs({ src: apLogo })`
  width: var(--ap-logo-size);
`

export const FooterContent = styled.div`
  padding-top: 20px;
  color: ${darkNeutral};
  font-size: 0.8em;

  a {
    color: ${primary.dark};

    &:hover {
      color: ${primary.main};
    }
  }
`
