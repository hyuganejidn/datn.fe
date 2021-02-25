import Loading from '@/_components/commons/Loader'
import React, { lazy, Suspense } from 'react'

const Home = lazy(() => import('./Home'))

export default [
  {
    path: '/',
    auth: false,
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    ),
  },
]
