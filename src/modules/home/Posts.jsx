import React from 'react'

import Post from './Post'
import { makeGetMe } from '../auth/store/selector'
import { makeGetPosts, makeGetPostsVoted } from './store/selector'

function Posts() {
  const user = makeGetMe()
  const posts = makeGetPosts()
  const postsVoted = makeGetPostsVoted()

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} isVote={postsVoted[post.id]} userId={user.id} />
      ))}
    </div>
  )
}

export default Posts
