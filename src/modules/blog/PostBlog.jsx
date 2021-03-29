import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { CommentLine, HeartLine } from 'Templates/icon/IconsSvg'
import * as typesHome from '@/modules/home/store/action_types'
import Modal3 from 'Templates/commons/Modal3'
import { useShouldShowModal } from '@/hooks/useShowModalLogin'
import { timeSince, capitalizeFirstLetter, getInnerText } from '@/helpers/common'

import { S_Footer, S_ThreeDotMenu } from '../comment/Comment.style'
import { S_ImageAvatar, S_PostContent, S_FooterLink, S_PostMain, S_PostTop, S_TopLink } from '../home/Post.style'
import PostUpdate from '../post/components/PostUpdate'

function PostBlog({ isAuth, post, userId, type }) {
  const dispatch = useDispatch()
  const [isShowUpdatePost, setIsShowUpdatePost] = useState(false)

  const handleDelete = () => {
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
    <div className="py-6 flex justify-between">
      <div>
        <S_PostTop>
          <S_TopLink to={`/blogs/${post.blog?.slug}`} className="font-medium text-sm text-black truncate no-underline">
            <div className="w-5 h-5 rounded-full mr-2 flex-shrink-0 no-underline">
              {post.blog?.avatar !== 'avatar' ? (
                <img
                  src={post.blog?.avatar}
                  alt={post.title}
                  style={{ objectFit: 'cover', height: '100%', borderRadius: 3 }}
                  // className="w-5 h-5 rounded-full mr-2 flex-shrink-0 no-underline"
                />
              ) : (
                <span
                  style={{
                    background: '#bdbdbd',
                    borderRadius: '50%',
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    textAlign: 'center',
                    lineHeight: '20px',
                  }}
                >
                  {capitalizeFirstLetter(post.author.fullName[0])}
                </span>
              )}
            </div>

            <div className="hover:underline">{post.blog?.title}</div>
          </S_TopLink>
          &ensp;bởi&ensp;
          <S_TopLink
            to={`/users/${post.author?.id}`}
            className="font-medium text-sm hover:underline text-black no-underline"
          >
            {post.author?.fullName}
          </S_TopLink>
        </S_PostTop>

        <S_PostMain>
          <Link to={`/blogs/posts/${post.id}`} className="mt-1 text-lg font-medium text-black">
            {post.title}
          </Link>
          <S_PostContent to={`/blogs/posts/${post.id}`}>{getInnerText(post.content)}</S_PostContent>
        </S_PostMain>

        <S_Footer>
          <S_FooterLink to={`/blogs/posts/${post.id}`} style={{ margin: '0 4px', color: '#718096' }}>
            <span style={{ fontSize: 14, color: '#718096' }}>{timeSince(post.createdAt)} &ensp;•&ensp;</span>
            <HeartLine width={14} style={{ color: '#f56565' }} />
            &ensp;
            <span style={{ fontSize: 14, color: '#718096' }}>{post.voteNum}</span>
            &ensp;•&ensp;
            <CommentLine width={14} style={{ marginRight: '2px' }} />
            &ensp;
            <span style={{ fontSize: 14, color: '#718096' }}>{post.commentNum}</span>
          </S_FooterLink>
          <S_ThreeDotMenu
            options={
              userId === post.author?.id
                ? [
                    { title: 'Xóa', onClick: handleDelete },
                    { title: 'Chỉnh sửa', onClick: handleUpdate },
                  ]
                : [{ title: 'Báo xấu', onClick: handleReport }]
            }
          />
        </S_Footer>
      </div>
      {post.avatar && (
        <div className="w-1/4 flex-shrink-0 ml-2 no-underline">
          <Link to={`/topics/posts/${post.id}`}>
            <div className="w-full relative" style={{ paddingTop: '65%' }}>
              <div className="absolute top-0 w-full h-full rounded-t">
                <S_ImageAvatar src={post.avatar} alt={post.topic?.slug} />
              </div>
            </div>
          </Link>
        </div>
      )}
      {isShowUpdatePost && (
        <Modal3
          title="Chỉnh sửa bài viết"
          setIsShowModal={setIsShowUpdatePost}
          component={PostUpdate}
          dataPost={post}
          type={type}
        />
      )}
    </div>
  )
}

export default PostBlog
