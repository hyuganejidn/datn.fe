import { capitalizeFirstLetter, timeSince } from '@/helpers/common'
import React from 'react'
import { Icon, Icons } from 'Templates/icon/Icon'
import {
  DownVote,
  UpVote,
  ImageDefault,
  Comment,
  Share,
  ThreeDot,
} from 'Templates/icon/IconsSvg'
import styled from 'styled-components'
import { Link } from '@material-ui/core'

const S_Post = styled.div`
  display: flex;
  /* align-items: flex-start; */
  --border-opacity: 1;
  border-top: 1px solid rgba(203, 213, 224, var(--border-opacity));
  border-right: 1px solid rgba(203, 213, 224, var(--border-opacity));
  border-left: 1px solid rgba(203, 213, 224, var(--border-opacity));
  background-color: white;
`
const S_Vote = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: rgb(248, 249, 250);

  width: 32px;
  padding: 8px 4px;
`

const S_Avatar = styled.div`
  min-width: 110px;
  margin: 8px 0px 8px 4px;
`
const S_AvatarDefault = styled.div`
  min-width: 100%;
  display: flex;
  align-items: center;
  min-height: 110px;
  background: #f5f5f5;
  justify-content: center;
  border-radius: 5px;
`

const S_ImageDefault = styled(ImageDefault)`
  color: #e2e8f0;
  font-size: 50px !important;
`
const S_Comment = styled(Comment)`
  width: 14px !important;
  color: rgb(113, 128, 150);
`
const S_Share = styled(Share)`
  width: 14px !important;
  color: rgb(113, 128, 150);
`

const S_ThreeDot = styled(ThreeDot)`
  width: 18px !important;
  color: rgb(113, 128, 150);
`

const S_PostTop = styled.div`
  display: flex;
  align-items: center;
  margin: 8px;

  color: #718096;
  font-size: 13px !important;
`

const S_PostInfo = styled.div`
  width: 100%;
`
const S_PostMain = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin: 0 8px;
  /* font-size: 50px !important;  */
`
const S_PostFooter = styled.div`
  display: flex;
  align-items: center;
  margin: 0 8px;
  color: rgb(113, 128, 150);
  line-height: 24px;
  font-size: 14px !important;
`

const S_PostTitle = styled(Link)`
  display: inline-block;
  font-weight: 500;
  color: #1a202c !important;
  font-size: 16px !important;
  cursor: pointer;
  :hover {
    text-decoration: none !important;
  }
`

const S_PostContent = styled(Link)`
  display: inline-block;
  padding: 4px 0;
  color: #718096 !important;
  font-weight: 500;
  font-size: 13px !important;
  cursor: pointer;
  :hover {
    text-decoration: none !important;
  }
`

const S_FooterLink = styled(Link)`
  display: flex;
  align-items: center;
  color: inherit !important;
  padding: 4px 4px;
  border-radius: 4px;
  font-weight: 500;

  cursor: pointer;
  :hover {
    background-color: rgba(237, 242, 247, var(--bg-opacity));
  }
`
const S_TopLink = styled(Link)`
  display: flex;
  align-items: center;
  color: inherit !important;

  cursor: pointer;
`
const S_Icon = styled(Icon)`
  margin-right: 4px;
`

const S_UpVote = styled(Link)`
  margin-right: 4px;
  height: 24px;
  color: rgb(113, 128, 150) !important;
  cursor: pointer;
  :hover {
    border-radius: 4px;
    background: #e2e8f0;
  }
`
const S_DownVote = styled(Link)`
  margin-right: 4px;
  height: 24px;
  color: rgb(113, 128, 150) !important;
  cursor: pointer;
  :hover {
    border-radius: 4px;
    background: #e2e8f0;
  }
`

function Post({ post }) {
  return (
    <S_Post>
      <S_Vote>
        <S_UpVote>
          <UpVote />
        </S_UpVote>
        <span>{post.voteNum}</span>
        <S_DownVote>
          <DownVote />
        </S_DownVote>
      </S_Vote>
      <S_Avatar>
        {post.avatar ? (
          <img src={post.avatar} alt={post.topic?.slug} />
        ) : (
          <S_AvatarDefault>
            <S_ImageDefault />
          </S_AvatarDefault>
        )}
      </S_Avatar>

      <S_PostInfo>
        <S_PostTop>
          <S_TopLink>
            <S_Icon
              icon={Icons[capitalizeFirstLetter(post.topic?.slug)]}
              width={16}
            />
            {post.topic?.name}
          </S_TopLink>
          &ensp;•&ensp;bởi&ensp;<S_TopLink>{post.author?.fullName}</S_TopLink>
          &ensp;•&ensp;{timeSince(post.createdAt)}
        </S_PostTop>

        <S_PostMain>
          <S_PostTitle>{post.title} </S_PostTitle>
          <S_PostContent>{post.content} </S_PostContent>
        </S_PostMain>

        <S_PostFooter>
          <S_FooterLink>
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
      </S_PostInfo>
    </S_Post>
  )
}

export default Post
