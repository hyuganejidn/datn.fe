import Loading from '@/_components/commons/Loader'
import React, { lazy, Suspense } from 'react'

const BlogView = lazy(() => import('./BlogView'))
const BlogHome = lazy(() => import('./BlogHome'))

export default [
  {
    path: '/blogs',
    auth: false,
    exact: true,
    component: props => (
      <Suspense fallback={<Loading />}>
        <BlogHome {...props} />
      </Suspense>
    ),
  },
  {
    path: '/blogs/:slug',
    auth: false,
    exact: true,
    component: props => (
      <Suspense fallback={<Loading />}>
        <BlogView {...props} />
      </Suspense>
    ),
  },
]
