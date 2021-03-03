import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { ImageDefault, Comment, Share, ThreeDot } from 'Templates/icon/IconsSvg'
import { Icon } from 'Templates/icon/Icon'

export const S_Post = styled.div`
  display: flex;
  /* align-items: flex-start; */
  --border-opacity: 1;
  border-top: 1px solid rgba(203, 213, 224, var(--border-opacity));
  border-right: 1px solid rgba(203, 213, 224, var(--border-opacity));
  border-left: 1px solid rgba(203, 213, 224, var(--border-opacity));
  background-color: white;
`
export const S_Vote = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: rgb(248, 249, 250);

  width: 32px;
  padding: 8px 4px;
`

export const S_Avatar = styled(Link)`
  min-width: 110px;
  margin: 8px 0px 8px 4px;
`
export const S_AvatarDefault = styled.div`
  min-width: 100%;
  display: flex;
  align-items: center;
  min-height: 110px;
  background: #f5f5f5;
  justify-content: center;
  border-radius: 5px;
`

export const S_ImageDefault = styled(ImageDefault)`
  color: #e2e8f0;
  font-size: 50px !important;
`
export const S_Comment = styled(Comment)`
  width: 14px !important;
  color: rgb(113, 128, 150);
`
export const S_Share = styled(Share)`
  width: 14px !important;
  color: rgb(113, 128, 150);
`

export const S_ThreeDot = styled(ThreeDot)`
  width: 18px !important;
  color: rgb(113, 128, 150);
`

export const S_PostTop = styled.div`
  display: flex;
  align-items: center;
  margin: 8px;

  color: #718096;
  font-size: 13px !important;
`

export const S_PostInfo = styled.div`
  width: 100%;
`
export const S_PostMain = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin: 0 8px;
  /* font-size: 50px !important;  */
`
export const S_PostFooter = styled.div`
  display: flex;
  align-items: center;
  margin: 0 8px;
  color: rgb(113, 128, 150);
  line-height: 24px;
  font-size: 14px !important;
`

export const S_PostTitle = styled(Link)`
  display: inline-block;
  font-weight: 500;
  color: #1a202c !important;
  font-size: 16px !important;
  cursor: pointer;
`

export const S_PostContent = styled(Link)`
  display: inline-block;
  padding: 4px 0;
  color: #718096 !important;
  font-weight: 500;
  font-size: 13px !important;
  cursor: pointer;
`

export const S_FooterLink = styled(Link)`
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
export const S_TopLink = styled(Link)`
  display: flex;
  align-items: center;
  color: inherit !important;

  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`
export const S_Icon = styled(Icon)`
  position: relative;
  top: -3px;
  margin-right: 4px;
`

export const S_UpVote = styled.button`
  height: 24px;
  background: none;
  outline: none;
  border: none;
  color: ${props =>
    !props.isVoted ? ' rgb(113, 128, 150)!important' : '#63b3ed !important'};
  cursor: pointer;
  :hover {
    border-radius: 4px;
    background: #e2e8f0;
  }
`
export const S_DownVote = styled.button`
  height: 24px;
  background: none;
  outline: none;
  border: none;
  /* color: rgb(113, 128, 150) !important; */
  color: ${props =>
    !props.isVoted ? ' rgb(113, 128, 150)!important' : '#e53e3e !important'};
  cursor: pointer;
  :hover {
    border-radius: 4px;
    background: #e2e8f0;
  }
`
