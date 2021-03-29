import React, { useEffect, useState } from 'react'

import { CommentSquareLine, Heart, HeartLine, ShareLine } from 'Templates/icon/IconsSvg'
import { S_FooterMainLink, S_PostViewFooter, S_FooterText } from '@/modules/home/Post.style'
import { S_HeartLike, S_Like, S_ThreeDotMenu } from '@/modules/comment/Comment.style'
import { PostAPI } from '@/services'
import * as typesHome from '@/modules/home/store/action_types'
import { useDispatch } from 'react-redux'
import { useShouldShowModal } from '@/hooks/useShowModalLogin'
import { useHistory } from 'react-router-dom'
import Modal3 from 'Templates/commons/Modal3'
import PostUpdate from './PostUpdate'

function PostViewFooterBlog({ isAuth, isVote, userId, post, socket }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const [voteTotal, setVoteTotal] = useState(undefined)
  const [isVoted, setIsVoted] = useState(isVote)
  const [isShowUpdatePost, setIsShowUpdatePost] = useState(false)

  useEffect(() => {
    const handleLike = _vote => {
      setVoteTotal(_vote)
    }

    socket.on('LikePost', handleLike)
    return () => socket.off('LikePost', handleLike)
  }, [])

  const handleLikePost = async _postId => {
    if (useShouldShowModal({ dispatch, isAuth, type: 'login' })) return

    const likeData = await PostAPI.likePost(_postId)
    socket.emit('LikePost', likeData.vote)
    setVoteTotal(likeData.vote)
    setIsVoted(prev => !prev)
  }

  const handleDelete = async id => {
    try {
      await PostAPI.destroy(id)
      socket.emit('DeletePost', id)
      history.push('/')
    } catch (error) {
      throw new Error(error)
    }
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
          <S_Like style={{ marginRight: 18 }}>
            <S_HeartLike onClick={() => handleLikePost(post.id)}>
              {isVoted ? (
                <Heart width={16} style={{ color: '#f56565' }} />
              ) : (
                <HeartLine width={16} style={{ color: '#f56565' }} />
              )}
            </S_HeartLike>

            <S_FooterText>{voteTotal || post.voteNum} lượt thích</S_FooterText>
          </S_Like>

          <S_FooterMainLink>
            <CommentSquareLine width={16} />
            <S_FooterText>{post.commentNum} Bình luận</S_FooterText>
          </S_FooterMainLink>

          <S_FooterMainLink>
            <ShareLine width={16} />
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
          classify="blog"
          type="blog"
        />
      )}
    </>
  )
}

export default PostViewFooterBlog
