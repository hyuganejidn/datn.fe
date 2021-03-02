import React from 'react'
import styled from 'styled-components'
import { topics } from '@/_constants/data'
import Forum from './Forum'
import Topics from './Topics'

const S_Layout = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
`

const S_Topics = styled(Topics)`
  position: sticky;
  top: 0;
  padding-right: 4px;
  width: 280px;
  max-height: calc(100vh - 50px);
  overflow-y: scroll;
  transition: 0.7s;
  :hover {
    ::-webkit-scrollbar {
      width: 4px;
      display: block;
    }
  }
  ::-webkit-scrollbar {
    width: 4px;
    display: none;
    /* background-color: #f5f5f5; */
  }
  ::-webkit-scrollbar-thumb {
    width: 4px;
    border-radius: 3px;
    background-color: #b2b2b26b;
  }
`
const S_Forum = styled(Forum)`
  width: 100%;
`

function Home() {
  return (
    <S_Layout>
      <S_Topics topics={topics} />
      <S_Forum />
    </S_Layout>
  )
}

export default Home
