import { makeGetIsAuthenticated, makeGetMe } from '@/modules/auth/store/selector'
import { Avatar } from '@material-ui/core'
import React, { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import {
  Menu,
  // ForumNav, BlogsNav,
  Search,
  BlogsNavColor,
  ForumNavColor,
  BlogsNav,
  ForumNav,
} from 'Templates/icon/IconsSvg'
import * as types from '@/modules/auth/store/action_types'
import useClickOutside from '@/hooks/useClickOutside'
import { useShouldShowModal } from '@/hooks/useShowModalLogin'

function HeaderNav() {
  const user = makeGetMe()
  const isAuth = makeGetIsAuthenticated()
  const dropdown = useRef(null)
  const location = useLocation()
  const isTab = {
    forum: /topics/.test(location.pathname) || location.pathname === '/',
    blog: /blogs/.test(location.pathname),
  }
  console.log(location)
  const dispatch = useDispatch()
  const history = useHistory()

  const [isShowPopupUser, setIsShowPopupUser] = useState(false)

  const dismissDropdown = useCallback(() => {
    setIsShowPopupUser(false)
  }, [setIsShowPopupUser])

  useClickOutside(dropdown, dismissDropdown)

  return (
    <div>
      <nav className="flex items-center w-full fixed h-12 bg-white border-gray-100 border-b z-30 shadow-sm">
        <div className="w-full md:w-11/12 mx-auto flex items-center justify-between md:px-1">
          <div className="flex items-center flex-shrink-0">
            <div className="md:hidden text-lg text-gray-700 ml-1">
              <Menu />
            </div>
            <a className="bg-white hidden md:block no-underline" href="/">
              <span className="text-green-500" style={{ fontFamily: '"Bangers", cursive', fontSize: 32 }}>
                ly kafe
              </span>
            </a>
            <Link
              to="/"
              className={`ml-3 text-gray-600 flex items-center font-semibold no-underline ${
                isTab.forum && 'text-black'
              }`}
            >
              {isTab.forum ? <ForumNavColor width="1.25" unit="rem" /> : <ForumNav width="1.25" unit="rem" />}
              <span className="ml-1 font-semibold">Diễn đàn</span>
            </Link>
            <Link
              to="/blogs?tab=news"
              className={`ml-3 text-gray-600 flex items-center font-semibold no-underline  ${
                isTab.blog && 'text-black'
              }`}
            >
              {isTab.blog ? <BlogsNavColor width="1.25" unit="rem" /> : <BlogsNav width="1.25" unit="rem" />}
              <span className="ml-1 font-semibold">Blog</span>
            </Link>
          </div>

          <div className=" md:flex items-center flex-shrink ml-10 w-full h-full pl-8 border border-gray-lightest hover:border-gray-500 rounded relative bg-gray-100">
            <Search width="16" />
            <input
              type="text"
              className="text-sm w-full my-1 outline-none bg-gray-100"
              name="search"
              placeholder="Tìm kiếm"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              if (useShouldShowModal({ dispatch, isAuth, type: 'login' })) return
              history.push('/posts/add?classify=forum')
            }}
            className=" md:block ml-5 mr-10 flex-shrink-0 hover:bg-green-600 rounded-full px-2 bg-green-500 py-px text-white no-underline"
          >
            <span className="text-sm">&nbsp;Đăng bài</span>
          </button>
          <div className="flex items-center flex-shrink-0">
            {!isAuth ? (
              <div className=" md:flex items-center flex-shrink-0">
                <Link to="/login" className="ml-5 flex-shrink-0 hover:text-black no-underline text-gray-600">
                  <span className="font-medium text-sm">Đăng nhập</span>
                </Link>
                <Link
                  to="/register"
                  className="px-3 flex-shrink-0 rounded-full ml-2 bg-green-500 hover:bg-green-700  no-underline text-gray-600"
                >
                  <span className="font-medium text-sm text-white">Đăng ký</span>
                </Link>
              </div>
            ) : (
              <div ref={dropdown} className="relative inline-block text-left">
                <div
                  className="false text-gray-700 select-none bg-white cursor-pointer p-1 rounded-lg hover:bg-gray-200"
                  onClick={() => setIsShowPopupUser(!isShowPopupUser)}
                  aria-hidden="true"
                >
                  <div className="hover:text-black flex items-center">
                    {user.avatarUrl ? (
                      <Avatar alt="" src={user.avatarUrl} style={{ width: 28, height: 28 }} />
                    ) : (
                      <Avatar style={{ width: 28, height: 28 }}>{user.fullName[0].toUpperCase()}</Avatar>
                    )}
                    <span className="hidden md:block text-sm mx-1 font-medium">{user.fullName}</span>
                    <i className="fas fa-caret-down ml-1 md:ml-0" />
                  </div>
                </div>
                {isShowPopupUser && (
                  <div className="mt-1 absolute rounded border border-gray-400 shadow-lg right-0">
                    <div className="bg-white rounded whitespace-no-wrap z-50 shadow-sm">
                      <Link
                        to={`/users/${user.id}`}
                        className="flex items-center rounded-t px-6 py-2 text-black hover:bg-green-200 cursor-pointer no-underline"
                        onClick={() => setIsShowPopupUser(!isShowPopupUser)}
                      >
                        <div>Trang cá nhân</div>
                      </Link>
                      <Link
                        to="/setting"
                        className="flex items-center px-6 py-2 text-black hover:bg-green-200 cursor-pointer no-underline"
                        onClick={() => setIsShowPopupUser(!isShowPopupUser)}
                      >
                        <div>Cài đặt tài khoản</div>
                      </Link>
                      <div className="h-px bg-gray-400"> </div>
                      <Link
                        to="/posts/add?classify=forum"
                        className="flex items-center px-6 py-2 text-black hover:bg-green-200 cursor-pointer no-underline"
                        onClick={() => setIsShowPopupUser(!isShowPopupUser)}
                      >
                        <div>Đăng bài diễn đàn</div>
                      </Link>
                      <Link
                        to="/blogs/add"
                        className="flex items-center px-6 py-2 text-black hover:bg-green-200 cursor-pointer no-underline"
                        onClick={() => setIsShowPopupUser(!isShowPopupUser)}
                      >
                        <div>Tạo blog</div>
                      </Link>
                      <Link
                        to="/blogs?tab=me"
                        className="flex items-center px-6 py-2 text-black hover:bg-green-200 cursor-pointer no-underline"
                        onClick={() => setIsShowPopupUser(!isShowPopupUser)}
                      >
                        <div>Blog của tôi</div>
                      </Link>
                      <div className="h-px bg-gray-400"> </div>
                      <div
                        className="flex items-center px-6 py-2 hover:bg-green-200 cursor-pointer rounded-b"
                        onClick={() => {
                          setIsShowPopupUser(!isShowPopupUser)
                          dispatch({ type: types.S_AUTH_LOGOUT_REQUEST })
                          history.push('/login')
                        }}
                        aria-hidden="true"
                      >
                        <div className="text-gray-600 mr-3">
                          <i className="fas fa-sign-out-alt fa-sm" />
                        </div>
                        <div>Đăng xuất</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HeaderNav
