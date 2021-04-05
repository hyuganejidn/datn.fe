import React, { useEffect, useState } from 'react'

import { makeGetSocketWithType } from '@/_layouts/Socket'
import Post from './Post'
import { makeGetIsAuthenticated, makeGetMe } from '../auth/store/selector'
import { makeGetPostsVoted } from './store/selector'

function Posts({ posts }) {
  const user = makeGetMe()
  const postsVoted = makeGetPostsVoted()
  const isAuth = makeGetIsAuthenticated()
  const socket = makeGetSocketWithType()
  const [voteSocket, setVoteSocket] = useState({})

  useEffect(() => {
    const handleVote = ({ vote, postId, userId }) => {
      setVoteSocket({ ...voteSocket, [postId]: { vote, userId } })
    }

    socket.on('VotePost', handleVote)
    return () => socket.off('VotePost', handleVote)
  }, [])

  return (
    <>
      {posts.map(post => (
        <Post
          key={post.id}
          post={post}
          isVote={postsVoted[post.id]}
          userId={user.id}
          isAuth={isAuth}
          voteSocket={voteSocket[post.id]}
        />
      ))}
    </>
  )
}

export default Posts
