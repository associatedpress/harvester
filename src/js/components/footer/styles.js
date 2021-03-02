import styled from 'styled-components'
import { gridGap } from 'js/styles/containers'
import { primary } from 'js/styles/colors'
import apLogo from 'images/ap_logo.png'

export const Container = styled.footer`
  min-height: 80px;
  background-color: ${primary.dark};
`

export const Logo = styled.img.attrs({ src: apLogo })`
  width: var(--ap-logo-size);
`

export const FooterContent = styled.div`
  padding-top: 20px;
  color: ${primary.midlight};

  a {
    color: ${primary.main};

    &:hover {
      color: ${primary.light};
    }
  }
`
