import Loading from '@/_components/commons/Loader'
import React, { lazy, Suspense } from 'react'

const BlogView = lazy(() => import('./BlogView'))

export default [
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
