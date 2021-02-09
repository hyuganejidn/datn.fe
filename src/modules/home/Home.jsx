import React from 'react'
import { useDispatch } from 'react-redux'
import { Auth } from '../auth/Auth'

function Home() {
  const dispatch = useDispatch()
  return (
    <div>
      <button type="button" onClick={() => dispatch({ type: '**' })}>
        hung
      </button>
      <Auth />
    </div>
  )
}

export default Home
