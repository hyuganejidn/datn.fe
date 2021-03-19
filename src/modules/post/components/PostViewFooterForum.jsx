import { S_ThreeDotMenu } from '@/modules/comment/Comment.style'
import {
  S_DownVote,
  S_UpVote,
  S_VoteRow,
  S_PostViewFooter,
  S_FooterMainLink,
  S_FooterText,
} from '@/modules/home/Post.style'
import { PostAPI } from '@/services'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DownVote, UpVote, CommentSquare, Share } from 'Templates/icon/IconsSvg'
import * as typesHome from '@/modules/home/store/action_types'
import { useDispatch } from 'react-redux'

function PostViewFooterForum({ isVote, userId, post }) {
  const history = useHistory()
  const dispatch = useDispatch()

  const [vote, setVote] = useState(undefined)
  const [isVoted, setIsVoted] = useState(isVote)

  const handleVotePost = async (_postId, voteNum) => {
    const voteData = await PostAPI.votePost(_postId, voteNum)
    setVote({
      voteTotal: voteData.vote,
      vote: isVoted === voteNum ? 0 : voteNum,
    })
    setIsVoted(isVoted === voteNum ? 0 : voteNum)
  }

  const handleDelete = async id => {
    try {
      await PostAPI.destroy(id)
      history.push('/')
    } catch (error) {
      throw new Error(error)
    }
    // dispatch({ type: types.S_DELETE_COMMENT, payload: comment })
  }

  const handleUpdate = () => {
    console.log('update')
    // dispatch({ type: types.S_UPDATE_COMMENT, payload: comment })
  }

  const handleReport = () => {
    dispatch({ type: typesHome.APP_UPDATE_ISHOWREPORT })
  }
  return (
    <>
      {post && (
        <S_PostViewFooter>
          <S_VoteRow>
            <S_UpVote onClick={() => handleVotePost(post.id, 1)} isVoted={vote?.vote === 1 || isVoted === 1}>
              <UpVote width={18} />
            </S_UpVote>
            <span style={{ margin: '0 4px' }}>{vote ? vote?.voteTotal : post.voteNum}</span>
            <S_DownVote onClick={() => handleVotePost(post.id, -1)} isVoted={vote?.vote === -1 || isVoted === -1}>
              <DownVote width={18} />
            </S_DownVote>
          </S_VoteRow>

          <S_FooterMainLink>
            <CommentSquare width={16} />
            <S_FooterText>{post.commentNum} Bình luận</S_FooterText>
          </S_FooterMainLink>

          <S_FooterMainLink>
            <Share width={16} />
            <S_FooterText>Chia sẽ</S_FooterText>
          </S_FooterMainLink>

          <S_ThreeDotMenu
            options={
              userId === post.author?.id
                ? [
                    { title: 'Xóa', onClick: () => handleDelete(post.id) },
                    { title: 'Chỉnh sửa', onClick: handleUpdate },
                  ]
                : [{ title: 'Báo xấu', onClick: handleReport }]
            }
          />
        </S_PostViewFooter>
      )}
    </>
  )
}

export default PostViewFooterForum
