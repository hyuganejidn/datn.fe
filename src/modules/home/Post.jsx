import React, { useEffect, useState } from 'react'

import { votePost } from '@/services/post'
import { capitalizeFirstLetter, getInnerText, timeSince } from '@/helpers/common'
import { Icons } from 'Templates/icon/Icon'
import { DownVote, UpVote } from 'Templates/icon/IconsSvg'
import { useDispatch } from 'react-redux'
import { PostAPI } from '@/services'
import Modal3 from 'Templates/commons/Modal3'
import { useShouldShowModal } from '@/hooks/useShowModalLogin'
import { ENV } from '@/_constants/common'
import {
  S_Avatar,
  S_AvatarDefault,
  S_Comment,
  S_DownVote,
  S_FooterLink,
  S_Icon,
  S_ImageAvatar,
  S_ImageDefault,
  S_Post,
  S_PostContent,
  S_PostFooter,
  S_PostInfo,
  S_PostMain,
  S_PostTitle,
  S_PostTop,
  S_Share,
  S_TopLink,
  S_UpVote,
  S_Vote,
} from './Post.style'
import { S_ThreeDotMenu } from '../comment/Comment.style'
import * as types from './store/action_types'
import PostUpdate from '../post/components/PostUpdate'

function Post({ isAuth, post, isVote, userId }) {
  const [vote, setVote] = useState(undefined)
  const dispatch = useDispatch()
  const [isVoted, setIsVoted] = useState(isVote)
  const [isShowUpdatePost, setIsShowUpdatePost] = useState(false)

  useEffect(() => {
    setIsVoted(() => isVote)
  }, [isVote])

  const handleVotePost = async (postId, voteNum) => {
    if (useShouldShowModal({ dispatch, isAuth, type: 'login' })) return

    const voteData = await votePost(postId, voteNum)
    setVote({
      voteTotal: voteData.vote,
      vote: isVoted === voteNum ? 0 : voteNum,
    })
    setIsVoted(isVoted === voteNum ? 1 : voteNum)
  }

  const handleDelete = async id => {
    try {
      await PostAPI.destroy(id)
      dispatch({ type: types.REMOVE_POST, payload: id })
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
    dispatch({ type: types.APP_UPDATE_IS_REPORT })
  }

  return (
    <S_Post className="shadow-box-2 rounded-lg" style={{ margin: '8px 0' }}>
      <S_Vote>
        <S_UpVote onClick={() => handleVotePost(post.id, 1)} isVoted={vote?.vote === 1 || isVoted === 1}>
          <UpVote />
        </S_UpVote>
        <span className="p-2">{vote ? vote?.voteTotal : post.voteNum}</span>
        <S_DownVote onClick={() => handleVotePost(post.id, -1)} isVoted={vote?.vote === -1 || isVoted === -1}>
          <DownVote />
        </S_DownVote>
      </S_Vote>

      <S_Avatar to={`/topics/posts/${post.id}`}>
        <S_AvatarDefault>
          {post.avatar ? (
            <S_ImageAvatar src={`${ENV.API_SERVER}${post.avatar}`} alt={post.topic?.slug} />
          ) : (
            <S_ImageDefault />
          )}
        </S_AvatarDefault>
      </S_Avatar>

      <S_PostInfo>
        <S_PostTop>
          <S_TopLink to={`/topics/${post.topic?.slug}`}>
            <S_Icon icon={Icons[capitalizeFirstLetter(post.topic?.slug)]} width={16} />
            {post.topic?.name}
          </S_TopLink>
          &ensp;•&ensp;bởi&ensp;
          <S_TopLink to={`/users/${post.author?.id}`}>{post.author?.fullName}</S_TopLink>
          &ensp;•&ensp;{timeSince(post.createdAt)}
        </S_PostTop>

        <S_PostMain>
          <S_PostTitle to={`/topics/posts/${post.id}`}>{post.title}</S_PostTitle>
          <S_PostContent to={`/topics/posts/${post.id}`}>{getInnerText(post.content)}</S_PostContent>
        </S_PostMain>

        <S_PostFooter>
          <S_FooterLink to={`/topics/posts/${post.id}`}>
            <S_Comment />
            <span style={{ marginLeft: 4, marginRight: 19 }}>{post.commentNum} Bình luận</span>
          </S_FooterLink>
          <S_FooterLink to={`/topics/posts/${post.id}`}>
            <S_Share />
            <span style={{ marginLeft: 4, marginRight: 19 }}>Chia sẽ</span>
          </S_FooterLink>
          <S_ThreeDotMenu
            options={
              userId === post.author?.id
                ? [
                    { title: 'Xóa bài viết', onClick: () => handleDelete(post.id) },
                    { title: 'Sửa bài viết', onClick: handleUpdate },
                  ]
                : [{ title: 'Báo xấu', onClick: handleReport }]
            }
          />
        </S_PostFooter>
      </S_PostInfo>
      {isShowUpdatePost && (
        <Modal3
          title="Chỉnh sửa bài viết"
          setIsShowModal={setIsShowUpdatePost}
          component={PostUpdate}
          dataPost={post}
          classify="forum"
          type="topic"
        />
      )}
    </S_Post>
  )
}

export default Post
