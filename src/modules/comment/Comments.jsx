import React from 'react'
import { makeGetMe } from '../auth/store/selector'
import Comment from './Comment'

function Comments({ type, comments, commentsUserVote }) {
  const user = makeGetMe()
  return (
    <>
      {comments.map((comment, i) => (
        <Comment
          type={type}
          key={comment.id}
          userId={user.id}
          comment={comment}
          commentsUserVote={commentsUserVote}
          isLasts={i === comments.length - 1}
          i={i}
        />
      ))}
    </>
  )
}

export default Comments
