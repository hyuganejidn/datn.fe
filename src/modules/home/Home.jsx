import React from 'react'
import { useDispatch } from 'react-redux'

function Home() {
  const dispatch = useDispatch()

  return (
    <div>
      <button type="button" onClick={() => dispatch({ type: '**' })}>
        hung
      </button>
    </div>
  )
}

export default Home
