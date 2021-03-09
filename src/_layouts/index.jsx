import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// import { makeGetMe } from '@/modules/auth/store/selector'
import { getAuthToken } from '@/helpers/storage'
import * as types from '@/modules/auth/store/action_types'

const Layout = ({ children, ...props }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = getAuthToken()
    if (token) dispatch({ type: types.S_AUTH_GET_ME })
  }, [])

  return (
    <div className="theme">
      <div className="layout" {...props}>
        {children}
      </div>
    </div>
  )
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
