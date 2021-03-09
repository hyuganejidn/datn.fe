import React, { useState } from 'react'

import { DownVote, UpVote, Heart, HeartLine } from 'Templates/icon/IconsSvg'
import { CommentAPI } from '@/services'

import {
  S_DownVote,
  S_Like,
  S_UpVote,
  S_Vote,
  S_HeartLike,
} from '../Comment.style'

function CommentVote({ type, isVote, commentId, commentVoteTotal }) {
  const [vote, setVote] = useState(undefined)
  const [isVoted, setIsVoted] = useState(isVote)

  const handleVoteComment = async (postId, voteNum) => {
    const voteData = await CommentAPI.voteComment(postId, voteNum)
    setVote({
      voteTotal: voteData.vote,
      vote: isVoted === voteNum ? 0 : voteNum,
    })
    setIsVoted(isVoted === voteNum ? 0 : voteNum)
  }

  const handleLikeComment = async postId => {
    const voteData = await CommentAPI.likeComment(postId)
    setVote({
      voteTotal: voteData.vote,
    })
    setIsVoted(prev => !prev)
  }

  return (
    <>
      {type === 'forum' ? (
        <S_Vote>
          <S_UpVote
            onClick={() => handleVoteComment(commentId, 1)}
            isVoted={vote?.vote === 1 || isVoted === 1}
          >
            <UpVote width={14} />
          </S_UpVote>
          <span style={{ fontSize: 16, margin: '0 3px', color: '#718096' }}>
            {vote ? vote?.voteTotal : commentVoteTotal}
          </span>
          <S_DownVote
            onClick={() => handleVoteComment(commentId, -1)}
            isVoted={vote?.vote === -1 || isVoted === -1}
          >
            <DownVote width={14} />
          </S_DownVote>
        </S_Vote>
      ) : (
        <S_Like>
          <S_HeartLike onClick={() => handleLikeComment(commentId)}>
            {isVoted ? (
              <Heart width={14} style={{ color: '#f56565' }} />
            ) : (
              <HeartLine width={14} style={{ color: '#f56565' }} />
            )}
          </S_HeartLike>

          <span style={{ fontSize: 14, margin: '0 3px', color: '#718096' }}>
            {vote ? vote?.voteTotal : commentVoteTotal} lượt thích
          </span>
        </S_Like>
      )}
    </>
  )
}

export default CommentVote
