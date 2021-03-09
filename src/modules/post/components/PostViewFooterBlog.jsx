import React, { useState } from 'react'

import {
  CommentSquareLine,
  Heart,
  HeartLine,
  ShareLine,
} from 'Templates/icon/IconsSvg'
import {
  S_FooterLink,
  S_PostViewFooter,
  S_FooterText,
} from '@/modules/home/Post.style'
import {
  S_HeartLike,
  S_Like,
  S_ThreeDotMenu,
} from '@/modules/comment/Comment.style'
import { PostAPI } from '@/services'

function PostViewFooterBlog({ isVote, userId, post }) {
  const [voteTotal, setVoteTotal] = useState(undefined)
  const [isVoted, setIsVoted] = useState(isVote)

  const handleLikePost = async _postId => {
    const likeData = await PostAPI.likePost(_postId)
    setVoteTotal(likeData.vote)
    setIsVoted(prev => !prev)
  }

  const handleDelete = () => {
    console.log('xoas')
    // dispatch({ type: types.S_DELETE_COMMENT, payload: comment })
  }

  const handleUpdate = () => {
    console.log('update')
    // dispatch({ type: types.S_UPDATE_COMMENT, payload: comment })
  }

  const handleReport = () => {
    console.log('report')
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

          <S_FooterLink>
            <CommentSquareLine width={16} />
            <S_FooterText>{post.commentNum} Bình luận</S_FooterText>
          </S_FooterLink>

          <S_FooterLink>
            <ShareLine width={16} />
            <S_FooterText>Chia sẽ</S_FooterText>
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
        </S_PostViewFooter>
      )}
    </>
  )
}

export default PostViewFooterBlog
