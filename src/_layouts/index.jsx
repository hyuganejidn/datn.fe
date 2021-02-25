import PropTypes from 'prop-types'
import React from 'react'

const Layout = ({ children, ...props }) => (
  <div className="theme">
    <div className="layout" {...props}>
      {children}
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
