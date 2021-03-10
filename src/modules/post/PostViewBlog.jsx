import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Avatar } from '@material-ui/core'

import { PostAPI } from '@/services'
import { timeSince } from '@/helpers/common'
import { LayoutContainer } from '@/_layouts'
import { Visibility } from 'Templates/icon/IconsSvg'

import Comments from '../comment/Comments'
import InputComment from '../comment/InputComment'
import * as types from '../comment/store/action_types'
import { S_NameAuthorLink } from '../comment/Comment.style'
import { makeGetCommentsPost } from '../comment/store/selector'
import PostViewFooterBlog from './components/PostViewFooterBlog'
import { makeGetIsAuthenticated, makeGetMe } from '../auth/store/selector'
import { S_InfoUser, S_PostInfo, S_PostMain, S_PostMainContent, S_PostMainForum } from '../home/Post.style'

function PostViewBlog() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const user = makeGetMe()
  const comments = makeGetCommentsPost()
  const isAuthenticated = makeGetIsAuthenticated()

  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null)
  const [commentsUserVote, setCommentsUserVote] = useState({})
  const [postUserVote, setPostUserVote] = useState({})

  const viewOptionBlog = () => {
    if (!isAuthenticated)
      return (
        <button type="button" onClick={() => 123}>
          Theo dõi
        </button>
      )
    const isFollowing = user.blogsFollowing.length > 0 && user.blogsFollowing.includes(post.blog.id)

    if (!user.blogsFollowing && post.author?.id === user.id)
      return (
        <button type="button" onClick={() => 123}>
          Tạo bài mới
        </button>
      )

    if (isFollowing) {
      return (
        <button type="button" onClick={() => 123}>
          Đang theo dõi
        </button>
      )
    }
    return (
      <button type="button" onClick={() => 123}>
        Theo dõi
      </button>
    )
  }

  useEffect(() => {
    // document.body.style.backgroundColor = '#fff'

    const fetchPost = async () => {
      try {
        const data = await PostAPI.getPostById(id)
        dispatch({ type: types.S_FETCH_COMMENTS_POST, payload: id })
        setPost(data)

        if (isAuthenticated) {
          const postsUserVoted = await PostAPI.getPostsUserLiked()
          const commentsVoted = await PostAPI.getCommentsLiked(id)

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
    <LayoutContainer style={{ padding: '8px 6px' }}>
      {!loading && post && (
        <S_PostMainForum>
          <S_PostInfo>
            <S_PostMain>
              <div style={{ display: 'flex' }}>
                <Link to={`/blogs/${post.blog?.slug}`}>Blog / {post.blog?.title}</Link>
                {viewOptionBlog()}
              </div>
              <h1 style={{ marginTop: 24 }}>{post.title}</h1>

              <S_InfoUser>
                <div>
                  {post.author?.avatarUrl ? (
                    <Avatar alt={post.author?.fullName} src={post.author?.avatarUrl} />
                  ) : (
                    <Avatar>{post.author?.fullName[0].toUpperCase()}</Avatar>
                  )}
                </div>

                <div style={{ marginLeft: '16px' }}>
                  <S_NameAuthorLink style={{ fontSize: '1rem', fontWeight: 400 }} to={`/users/${post.author?.id}`}>
                    {post.author.fullName}
                  </S_NameAuthorLink>
                  {/* <p>{post.author?.fullName}</p> */}
                  <p
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#718096',
                      fontSize: 14,
                    }}
                  >
                    {timeSince(post.createdAt)},
                    <Visibility width={18} style={{ margin: '0 6px' }} />
                    {post.viewNum}
                  </p>
                </div>
              </S_InfoUser>

              <S_PostMainContent>{post.content}</S_PostMainContent>
            </S_PostMain>

            <PostViewFooterBlog post={post} userId={user.id} isVote={isAuthenticated && postUserVote[post.id]} />

            <Comments type="blog" comments={comments} commentsUserVote={isAuthenticated ? commentsUserVote : {}} />

            <InputComment placeholder="Viết bình luận..." onSubmitComment={handleSubmitComment} />
          </S_PostInfo>
        </S_PostMainForum>
      )}
    </LayoutContainer>
  )
}

export default PostViewBlog
