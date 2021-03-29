import React, { useEffect, useState } from 'react'

import { DownVote, UpVote, Heart, HeartLine } from 'Templates/icon/IconsSvg'
import { CommentAPI } from '@/services'

import { useShouldShowModal } from '@/hooks/useShowModalLogin'
import { useDispatch } from 'react-redux'
import { makeGetSocketWithType } from '@/_layouts/Socket'
import { S_DownVote, S_Like, S_UpVote, S_Vote, S_HeartLike } from '../Comment.style'

function CommentVote({ isAuth, type, isVote, commentId, commentVoteTotal }) {
  const dispatch = useDispatch()
  const socket = makeGetSocketWithType()

  const [vote, setVote] = useState({
    voteTotal: commentVoteTotal,
    vote: isVote || 0,
  })

  useEffect(() => {
    const handleVote = ({ _vote, _commentId }) => {
      if (_commentId === commentId) {
        setVote(prev => ({ ...prev, voteTotal: _vote.voteTotal }))
      }
    }

    socket.on('VoteComment', handleVote)
    socket.on('LikeComment', handleVote)
    return () => {
      socket.off('VoteComment', handleVote)
      socket.off('LikeComment', handleVote)
    }
  }, [])

  const handleVoteComment = async (postId, voteNum) => {
    if (useShouldShowModal({ dispatch, isAuth, type: 'login' })) return

    try {
      const voteData = await CommentAPI.voteComment(postId, voteNum)
      const voteNew = {
        voteTotal: voteData.vote,
        vote: vote.vote === voteNum ? 0 : voteNum,
      }
      setVote(voteNew)

      socket.emit('VoteComment', { vote, voteNum, commentId })
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleLikeComment = async postId => {
    if (useShouldShowModal({ dispatch, isAuth, type: 'login' })) return

    const voteData = await CommentAPI.likeComment(postId)
    const voteNew = {
      voteTotal: voteData.vote,
      vote: !vote.vote,
    }
    socket.emit('LikeComment', { vote: voteNew, commentId })
    setVote(voteNew)
  }

  return (
    <>
      {type === 'forum' ? (
        <S_Vote>
          <S_UpVote onClick={() => handleVoteComment(commentId, 1)} isVoted={vote?.vote === 1}>
            <UpVote width={14} />
          </S_UpVote>
          <span style={{ fontSize: 16, margin: '0 3px', color: '#718096' }}>{vote?.voteTotal}</span>
          <S_DownVote onClick={() => handleVoteComment(commentId, -1)} isVoted={vote?.vote === -1}>
            <DownVote width={14} />
          </S_DownVote>
        </S_Vote>
      ) : (
        <S_Like>
          <S_HeartLike onClick={() => handleLikeComment(commentId)}>
            {vote.vote ? (
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
