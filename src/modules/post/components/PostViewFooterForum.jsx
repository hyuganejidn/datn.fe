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
import Modal3 from 'Templates/commons/Modal3'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DownVote, UpVote, CommentSquare, Share } from 'Templates/icon/IconsSvg'
import * as typesHome from '@/modules/home/store/action_types'
import { useDispatch } from 'react-redux'
import { useShouldShowModal } from '@/hooks/useShowModalLogin'
import PostUpdate from './PostUpdate'

function PostViewFooterForum({ isAuth, isVote, userId, post, socket }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isShowUpdatePost, setIsShowUpdatePost] = useState(false)

  const [vote, setVote] = useState({
    voteTotal: post.voteNum,
    vote: isVote,
  })

  useEffect(() => {
    const handleVote = ({ _vote }) => {
      setVote(prev => ({ ...prev, voteTotal: _vote.voteTotal }))
    }

    socket.on('VotePost', handleVote)
    return () => socket.off('VotePost', handleVote)
  }, [])

  const handleVotePost = async (_postId, voteNum) => {
    if (useShouldShowModal({ dispatch, isAuth, type: 'login' })) return

    socket.emit('VotePost', { voteNum, vote })

    const voteData = await PostAPI.votePost(_postId, voteNum)
    setVote({
      voteTotal: voteData.vote,
      vote: vote.vote === voteNum ? 0 : voteNum,
    })
  }

  const handleDelete = async id => {
    try {
      await PostAPI.destroy(id)
      socket.emit('DeletePost', id)
      history.push('/')
    } catch (error) {
      throw new Error(error)
    }
    // dispatch({ type: types.S_DELETE_COMMENT, payload: comment })
  }

  const handleUpdate = () => {
    setIsShowUpdatePost(prev => !prev)
  }

  const handleReport = () => {
    if (useShouldShowModal({ dispatch, isAuth, type: 'login' })) return
    dispatch({ type: typesHome.APP_UPDATE_IS_REPORT })
  }
  return (
    <>
      {post && (
        <S_PostViewFooter>
          <S_VoteRow>
            <S_UpVote onClick={() => handleVotePost(post.id, 1)} isVoted={vote?.vote === 1}>
              <UpVote width={18} />
            </S_UpVote>
            <span style={{ margin: '0 4px' }}>{vote ? vote?.voteTotal : post.voteNum}</span>
            <S_DownVote onClick={() => handleVotePost(post.id, -1)} isVoted={vote?.vote === -1}>
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
      {isShowUpdatePost && (
        <Modal3
          title="Chỉnh sửa bài viết"
          setIsShowModal={setIsShowUpdatePost}
          component={PostUpdate}
          dataPost={post}
          classify="forum"
          type="post"
        />
      )}
    </>
  )
}

export default PostViewFooterForum
