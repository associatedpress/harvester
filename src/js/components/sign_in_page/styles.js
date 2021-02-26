import styled from 'styled-components'
import icon from './defaultIcon.svg'

export const ButtonsContainer = styled.div`
  max-width: 300px;
  margin: 0 auto;
  overflow: visible;
`

export const ButtonContainer = styled.a`
  display: flex;
  height: 55px;
  border: 1px solid ${props => props.color || '#e0e0e0'};
  background-color: #fff;
  color: ${props => props.color || 'inherit'};
  align-items: center;
  text-decoration: none;
  transition: 0.25s;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: 0.25s;
  }
`

export const ButtonIconContainer = styled.div`
  height: 100%;
  background-color: ${props => props.color || '#e0e0e0'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`

export const ButtonIcon = styled.div`
  width: 36px;
  height: 36px;
  margin: 0 12px;
  background-image: url("${props => props.icon || icon}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 72%;
  border-radius: 50%;
`

export const ButtonLabel = styled.div`
`
