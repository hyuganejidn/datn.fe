import React from 'react'

import Post from './Post'
import { makeGetIsAuthenticated, makeGetMe } from '../auth/store/selector'
import { makeGetPosts, makeGetPostsVoted } from './store/selector'

function Posts() {
  const user = makeGetMe()
  const posts = makeGetPosts()
  const postsVoted = makeGetPostsVoted()
  const isAuth = makeGetIsAuthenticated()

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} isVote={postsVoted[post.id]} userId={user.id} isAuth={isAuth} />
      ))}
    </div>
  )
}

export default Posts
