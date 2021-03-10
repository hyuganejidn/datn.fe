import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { capitalizeFirstLetter, timeSince } from '@/helpers/common'
import { Icons } from 'Templates/icon/Icon'
import { PostAPI } from '@/services'
import { useDispatch } from 'react-redux'
import { LayoutContainer } from '@/_layouts'
import {
  S_Icon,
  S_PostInfo,
  S_PostTop,
  S_TopLink,
  S_PostMain,
  S_PostMainTitle,
  S_PostMainForum,
  S_PostMainContent,
} from '../home/Post.style'
import Comments from '../comment/Comments'
import { makeGetIsAuthenticated, makeGetMe } from '../auth/store/selector'
import { makeGetCommentsPost } from '../comment/store/selector'
import * as types from '../comment/store/action_types'
import InputComment from '../comment/InputComment'
import PostViewFooterForum from './components/PostViewFooterForum'

function PostViewForum() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const user = makeGetMe()
  const comments = makeGetCommentsPost()
  const isAuthenticated = makeGetIsAuthenticated()

  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null)

  const [commentsUserVote, setCommentsUserVote] = useState({})
  const [postUserVote, setPostUserVote] = useState({})

  useEffect(() => {
    document.body.style.backgroundColor = null

    const fetchPost = async () => {
      try {
        const data = await PostAPI.getPostById(id)
        dispatch({ type: types.S_FETCH_COMMENTS_POST, payload: id })
        setPost(data)

        if (isAuthenticated) {
          const postsUserVoted = await PostAPI.getPostsUserVoted()
          const commentsVoted = await PostAPI.getCommentsVoted(id)

          setCommentsUserVote(commentsVoted)
          setPostUserVote(postsUserVoted)
        }
      } catch (error) {
        throw new Error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [])

  const handleSubmitComment = async ({ content }, { resetForm }) => {
    const data = { content: content.slice(0, -1), postId: post.id }
    dispatch({ type: types.S_CREATE_COMMENT_POST, payload: data })
    resetForm()
  }

  return (
    <LayoutContainer>
      {!loading && post && (
        <S_PostMainForum>
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
              <S_PostMainTitle>{post.title}</S_PostMainTitle>
              <S_PostMainContent dangerouslySetInnerHTML={{ __html: post.content }} />
            </S_PostMain>

            <PostViewFooterForum post={post} userId={user.id} isVote={isAuthenticated && postUserVote[post.id]} />

            <Comments type="forum" comments={comments} isAuth={isAuthenticated} commentsUserVote={commentsUserVote} />

            <InputComment placeholder="Viết bình luận..." onSubmitComment={handleSubmitComment} />
          </S_PostInfo>
        </S_PostMainForum>
      )}
    </LayoutContainer>
  )
}

export default PostViewForum
