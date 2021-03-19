import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { CommentLine } from 'Templates/icon/IconsSvg'
import * as typesHome from '@/modules/home/store/action_types'
import {
  S_Footer,
  S_FooterLink,
  S_Avatar,
  S_CommentMain,
  S_Comment,
  S_CommentContent,
  S_NameAuthorLink,
  S_TitleReply,
  S_ThreeDotMenu,
  S_LineCurves,
  S_LineStraight,
} from './Comment.style'
import InputComment from './InputComment'
import CommentVote from './components/CommentVote'
import * as types from './store/action_types'

function Comment({ i, type, comment, userId, handleReplyCommentChild, commentsUserVote, isLasts }) {
  const dispatch = useDispatch()

  const [isReply, setIsReply] = useState(false)

  const [commentReply, setCommentReply] = useState(comment)

  const handleSubmitComment = async ({ content }) => {
    const data = {
      content,
      postId: commentReply.post.id,
      parentId: commentReply.id,
    }
    dispatch({ type: types.S_CREATE_CHILD_COMMENT, payload: data })
    setIsReply(prev => !prev)
  }

  const onReplyCommentChild = _comment => {
    setIsReply(true)
    setCommentReply(_comment)
  }

  const handleReplyComment = () => {
    if (handleReplyCommentChild) {
      handleReplyCommentChild()
    }
    setIsReply(true)
  }

  const handleDelete = () => {
    dispatch({ type: types.S_DELETE_COMMENT, payload: comment })
  }

  const handleUpdate = () => {
    console.log('update')
    // dispatch({ type: types.S_UPDATE_COMMENT, payload: comment })
  }

  const handleReport = () => {
    dispatch({ type: typesHome.APP_UPDATE_ISHOWREPORT })
  }

  return (
    <S_Comment>
      <S_Avatar style={{ position: 'relative' }}>
        {comment.author?.avatarUrl ? (
          <Avatar alt={comment.author?.fullName} src={comment.author?.avatarUrl} />
        ) : (
          <Avatar>{comment.author?.fullName[0].toUpperCase()}</Avatar>
        )}
        {handleReplyCommentChild ? (
          <S_LineCurves />
        ) : (
          (!isLasts || i === 0 || (isLasts && comment.commentsChild.length > 0)) && <S_LineStraight />
        )}
      </S_Avatar>

      <S_CommentMain style={{ width: '100%' }}>
        <S_CommentContent>
          <div>
            <S_NameAuthorLink to={`/users/${comment.author.id}`}>{comment.author.fullName}</S_NameAuthorLink>
            {comment.userBeingReply && comment.userBeingReply.id !== comment.author.id && (
              <Link to={`/users/${comment.userBeingReply.id}`} style={{ color: '#38a169', fontSize: '0.875rem' }}>
                @{comment.userBeingReply.fullName}
              </Link>
            )}
          </div>
          <div style={{ margin: `6px 0px` }}>{comment.content}</div>
        </S_CommentContent>

        <S_Footer>
          <CommentVote
            type={type}
            commentId={comment.id}
            commentVoteTotal={comment.voteNum}
            isVote={commentsUserVote[comment.id]}
          />

          <S_FooterLink type="button" onClick={handleReplyComment} style={{ margin: '0 8px', color: '#718096' }}>
            <CommentLine width={14} style={{ marginRight: '2px' }} />
            Trả lời
          </S_FooterLink>

          <S_ThreeDotMenu
            options={
              userId === comment.author?.id
                ? [
                    { title: 'Xóa', onClick: handleDelete },
                    { title: 'Chỉnh sửa', onClick: handleUpdate },
                  ]
                : [{ title: 'Báo xấu', onClick: handleReport }]
            }
          />
        </S_Footer>

        {comment.commentsChild?.length > 0 && (
          <div className="commentChild" style={{ marginTop: '8px' }}>
            {comment.commentsChild.map(commentChild => (
              <Comment
                type={type}
                userId={userId}
                key={commentChild.id}
                comment={commentChild}
                commentsUserVote={commentsUserVote}
                handleReplyCommentChild={() => onReplyCommentChild(commentChild)}
              />
            ))}
          </div>
        )}

        {isReply && !handleReplyCommentChild && (
          <>
            <S_TitleReply>
              Đang trả lời cho &ensp;•&ensp;
              <Link to={`/users/${commentReply.author?.id}`} style={{ color: '#38a169' }}>
                {commentReply.author?.fullName}
              </Link>
            </S_TitleReply>

            <InputComment
              comment={commentReply}
              placeholder="Viết câu trả lời..."
              onSubmitComment={handleSubmitComment}
            />
          </>
        )}
      </S_CommentMain>
    </S_Comment>
  )
}

export default Comment
