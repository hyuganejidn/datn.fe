import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Posts from './Posts'
import * as types from './store/action_types'
import { makeGetIsAuthenticated } from '../auth/store/selector'

function Forum({ className }) {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const isAuthenticated = makeGetIsAuthenticated()

  const getPosts = () => dispatch({ type: types.S_FETCH_POSTS, payload: slug })
  const getPostsVoted = () => dispatch({ type: types.S_FETCH_POSTS_VOTED })

  useEffect(() => {
    getPosts()
    if (isAuthenticated) {
      getPostsVoted()
    }
  }, [slug])

  return (
    <div className={className}>
      <Posts />
    </div>
  )
}

export default Forum
