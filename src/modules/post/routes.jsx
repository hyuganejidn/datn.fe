import Loading from '@/_components/commons/Loader'
import React, { lazy, Suspense } from 'react'

const PostViewForum = lazy(() => import('./PostViewForum'))
const PostViewBlog = lazy(() => import('./PostViewBlog'))
const PostAdd = lazy(() => import('./components/PostAdd'))

export default [
  {
    path: '/topics/posts/:id',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <PostViewForum />
      </Suspense>
    ),
  },
  {
    path: '/blogs/posts/:id',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <PostViewBlog />
      </Suspense>
    ),
  },
  {
    path: '/posts/add',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <PostAdd />
      </Suspense>
    ),
  },
]
