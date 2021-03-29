import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// import { makeGetMe } from '@/modules/auth/store/selector'
import { getAuthToken } from '@/helpers/storage'
import * as types from '@/modules/auth/store/action_types'
import * as typesHome from '@/modules/home/store/action_types'
import { makeGetProcessing } from '@/modules/auth/store/selector'
import { makeGetIsShowReport, makeGetIsLogin } from '@/modules/home/store/selector'

import HeaderNav from '@/_components/header/'
import Report from 'Templates/features/Report'
import Modal from 'Templates/commons/Modal2'
import ShouldLogin from 'Templates/commons/ModalShouldLogin'

const Layout = ({ children, ...props }) => {
  const dispatch = useDispatch()
  const loadingLogin = makeGetProcessing('login')
  const isShowReport = makeGetIsShowReport()
  const isShowLogin = makeGetIsLogin()

  useEffect(() => {
    const token = getAuthToken()
    if (token) dispatch({ type: types.S_AUTH_GET_ME })
    else dispatch({ type: types.AUTH_SET_PROCESSING, payload: { key: 'login' } })
  }, [])

  return (
    <div className="theme">
      {!loadingLogin && (
        <>
          <HeaderNav />
          <div className="pt-12">
            <div className="layout" {...props}>
              {children}
            </div>
          </div>
        </>
      )}
      {isShowReport && (
        <Modal
          title="Chọn lý do báo xấu"
          setIsShowModal={() => {
            dispatch({ type: typesHome.APP_UPDATE_IS_REPORT })
          }}
          component={Report}
        />
      )}
      {isShowLogin && (
        <Modal
          title="Bạn chưa đăng nhập"
          setIsShowModal={() => {
            dispatch({ type: typesHome.APP_UPDATE_IS_LOGIN })
          }}
          component={ShouldLogin}
        />
      )}
    </div>
  )
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

export const LayoutContainer = ({ children }) => <div className="bg-white mx-2 lg:mx-auto lg:max-w-2xl">{children}</div>

export const LayoutUser = ({ children }) => (
  <div className="md:w-7/12 mx-auto rounded-b border border-t-0 border-gray-400 bg-white pt-5 pb-12 h-full">
    {children}
  </div>
)

export const LayoutBg = ({ children }) => <div className="theme-bg h-full">{children}</div>
