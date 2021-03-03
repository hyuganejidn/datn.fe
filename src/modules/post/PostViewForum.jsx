import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { capitalizeFirstLetter, timeSince } from '@/helpers/common'
import { Icons } from 'Templates/icon/Icon'
import { PostAPI } from '@/services'
import { DownVote, UpVote } from 'Templates/icon/IconsSvg'
import {
  S_Comment,
  S_DownVote,
  S_FooterLink,
  S_Icon,
  S_Post,
  S_PostContent,
  S_PostFooter,
  S_PostInfo,
  S_PostMain,
  S_PostTitle,
  S_PostTop,
  S_Share,
  S_ThreeDot,
  S_TopLink,
  S_UpVote,
  S_Vote,
} from '../home/Post.style'
import Comments from './Comments'

function PostViewForum() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null)
  const [vote, setVote] = useState(undefined)
  const [isVoted, setIsVoted] = useState(null)
  const [comments, setComments] = useState([])

  const fetchPost = async () => {
    try {
      const data = await PostAPI.getPostById(id)
      const postsUserVoted = await PostAPI.getPostsUserVoted()
      const commentsData = await PostAPI.listComment(id)
      console.log(commentsData)
      setIsVoted(postsUserVoted[data.id])
      setComments(commentsData)
      setPost(data)
    } catch (error) {
      throw new Error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleVotePost = async (postId, voteNum) => {
    const voteData = await PostAPI.votePost(postId, voteNum)
    setVote({
      voteTotal: voteData.vote,
      vote: isVoted === voteNum ? 0 : voteNum,
    })
    setIsVoted(isVoted === voteNum ? 0 : voteNum)
  }

  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <div>
      {!loading && post && (
        <S_Post>
          <S_Vote>
            <S_UpVote
              onClick={() => handleVotePost(post.id, 1)}
              isVoted={vote?.vote === 1 || isVoted === 1}
            >
              <UpVote />
            </S_UpVote>
            <span>{vote ? vote?.voteTotal : post.voteNum}</span>
            <S_DownVote
              onClick={() => handleVotePost(post.id, -1)}
              isVoted={vote?.vote === -1 || isVoted === -1}
            >
              <DownVote />
            </S_DownVote>
          </S_Vote>
          <S_PostInfo>
            <S_PostTop>
              <S_TopLink to={`/topics/${post.topic?.slug}`}>
                <S_Icon
                  icon={Icons[capitalizeFirstLetter(post.topic?.slug)]}
                  width={16}
                />
                {post.topic?.name}
              </S_TopLink>
              &ensp;•&ensp;bởi&ensp;
              <S_TopLink to={`/users/${post.author?.id}`}>
                {post.author?.fullName}
              </S_TopLink>
              &ensp;•&ensp;{timeSince(post.createdAt)}
            </S_PostTop>

            <S_PostMain>
              <S_PostTitle>{post.title}</S_PostTitle>
              <S_PostContent>{post.content}</S_PostContent>
            </S_PostMain>
            <S_PostFooter>
              <S_FooterLink to={`/topics/posts/${post.id}`}>
                <S_Comment />
                <span style={{ marginLeft: 4, marginRight: 19 }}>
                  {post.commentNum} Bình luận
                </span>
              </S_FooterLink>
              <S_FooterLink>
                <S_Share />
                <span style={{ marginLeft: 4, marginRight: 19 }}>Chia sẽ</span>
              </S_FooterLink>
              <S_FooterLink>
                <S_ThreeDot />
              </S_FooterLink>
            </S_PostFooter>
            <Comments comments={comments} />
          </S_PostInfo>
        </S_Post>
      )}
    </div>
  )
}

export default PostViewForum
