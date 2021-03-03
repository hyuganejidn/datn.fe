import React from 'react'
import { Link } from 'react-router-dom'

function Comment({ comment }) {
  return (
    <div>
      <div>avatar</div>
      <div>
        <div>
          <div>
            <Link to={`/users/${comment.author.id}`}>
              {comment.author.fullName}
            </Link>
            {comment.userBeingReply &&
              comment.userBeingReply.id !== comment.author.id && (
                <Link to={`/users/${comment.userBeingReply.id}`}>
                  @{comment.userBeingReply.fullName}
                </Link>
              )}
          </div>
          <div> {comment.content}</div>
        </div>

        <div>
          <div>
            upvote
            {comment.voteNum}
            downvote
          </div>
          <div>Trả lời</div>
          <div>Trả lời</div>
        </div>
      </div>
      {comment.commentsChild?.length > 0 && (
        <div className="commentChild" style={{ marginLeft: 30 }}>
          {comment.commentsChild.map(commentChild => (
            <Comment key={commentChild.id} comment={commentChild} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Comment
