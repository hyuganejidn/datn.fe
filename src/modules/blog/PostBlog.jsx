import { timeSince } from '@/helpers/common'
import React from 'react'
import {
  S_Comment,
  S_FooterLink,
  S_PostContent,
  S_PostFooter,
  S_PostMain,
  S_PostTitle,
  S_PostTop,
  S_ThreeDot,
  S_TopLink,
} from '../home/Post.style'

function PostBlog({ post }) {
  return (
    <div>
      <S_PostTop>
        <S_TopLink to={`/blogs/${post.blog?.slug}`}>
          <img src={post.blog?.avatar} alt={post.title} />
          {post.blog?.title}
        </S_TopLink>
        &ensp;•&ensp;bởi&ensp;
        <S_TopLink to={`/users/${post.author?.id}`}>
          {post.author?.fullName}
        </S_TopLink>
        &ensp;•&ensp;{timeSince(post.createdAt)}
      </S_PostTop>

      <S_PostMain>
        <S_PostTitle to={`/blogs/posts/${post.id}`}>{post.title}</S_PostTitle>
        <S_PostContent to={`/blogs/posts/${post.id}`}>
          {post.content}
        </S_PostContent>
      </S_PostMain>

      <S_PostFooter>
        <S_FooterLink to={`/blogs/posts/${post.id}`}>
          <S_Comment />
          <span style={{ marginLeft: 4, marginRight: 19 }}>
            {post.commentNum}
          </span>
        </S_FooterLink>

        <S_FooterLink>
          <S_ThreeDot />
        </S_FooterLink>
      </S_PostFooter>
    </div>
  )
}

export default PostBlog
