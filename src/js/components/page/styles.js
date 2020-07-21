import styled from 'styled-components'
import deleteIcon from 'images/trash.svg'
import collapseIcon from 'images/collapse.svg'
import expandIcon from 'images/expand.svg'

export const Container = styled.div`
  padding: 1rem;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  margin: 1rem 0;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.2em;
`

export const Label = styled.div`
  font-family: "Good Cond Bold", "Arial Narrow", Arial, sans-serif;
  margin-right: 1em;
  min-width: 120px;
`

export const Value = styled.div`
  flex-grow: 1;
`

export const Help = styled.span`
  &::before {
    content: 'i';
    font-size: 0.7em;
    color: #aaa;
    vertical-align: top;
    width: 1em;
    height: 1em;
    border: 1px solid #aaa;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    margin-left: 0.3em;
    cursor: help;
  }
`

const Icon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  cursor: pointer;
`

export const Delete = styled(Icon)`
  content: url(${deleteIcon});
`

export const Expand = styled(Icon)`
  content: url(${expandIcon});
  margin-right: 0.4em;
`

export const Collapse = styled(Icon)`
  content: url(${collapseIcon});
`

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 1rem;
    color: #666;
  }
`

export const Body = styled.div`
  padding-top: 1rem;
`
