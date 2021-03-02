import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'Templates/icon/Icon'
import styled from 'styled-components'

const S_Li = styled.li`
  display: block;
  border-radius: 4px;
  :hover {
    background-color: rgb(104, 211, 145);
    a {
      --text-opacity: 1;
      color: rgba(0, 0, 0, var(--text-opacity));
    }
  }
`

const S_Link = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 14px;
  --text-opacity: 1;
  /* color: #000; */
  color: rgba(74, 85, 104, var(--text-opacity));
  padding: 8px 8px;
`

const S_Icon = styled(Icon)`
  margin-right: 4px;
`

const S_Span = styled.span`
  margin-left: 6px;
  font-size: 16px;
`

function Topic({ topic }) {
  const { slug, name, icon } = topic
  return (
    <S_Li>
      <S_Link to={slug === '' ? '/' : `/topics/${slug}`}>
        <S_Icon icon={icon} width={22} />
        <S_Span>{name}</S_Span>
      </S_Link>
    </S_Li>
  )
}

export default Topic
