import React from 'react'
import { useDispatch } from 'react-redux'

function Home() {
  const dispatch = useDispatch()
  console.log('hung test  123')

  return (
    <div>
      <button type="button" onClick={() => dispatch({ type: '**' })}>
        hung
      </button>
    </div>
  )
}

export default Home
