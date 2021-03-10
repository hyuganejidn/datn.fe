import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// import { makeGetMe } from '@/modules/auth/store/selector'
import { getAuthToken } from '@/helpers/storage'
import * as types from '@/modules/auth/store/action_types'
import { makeGetProcessing } from '@/modules/auth/store/selector'

const Layout = ({ children, ...props }) => {
  const dispatch = useDispatch()
  const loadingLogin = makeGetProcessing('login')
  useEffect(() => {
    const token = getAuthToken()
    if (token) dispatch({ type: types.S_AUTH_GET_ME })
    else dispatch({ type: types.AUTH_SET_PROCESSING, payload: { key: 'login' } })
  }, [])

  return (
    <div className="theme">
      {!loadingLogin && (
        <div className="layout" {...props}>
          {children}
        </div>
      )}
    </div>
  )
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

export const LayoutContainer = ({ children }) => <div className="bg-white mx-2 lg:mx-auto lg:max-w-2xl">{children}</div>
