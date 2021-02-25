import React from 'react'
import { useDispatch } from 'react-redux'

function Home() {
  const dispatch = useDispatch()
  return (
    <div>
      <button
        type="button"
        className="bg-gray-400"
        onClick={() => dispatch({ type: '**' })}
      >
        hung
      </button>
    </div>
  )
}

export default Home
