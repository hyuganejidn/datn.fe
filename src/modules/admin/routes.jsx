import Loading from '@/_components/commons/Loader'
import React, { lazy, Suspense } from 'react'

const Reports = lazy(() => import('./report/Reports'))

export default [
  {
    path: '/admin',
    auth: true,
    role: 'admin',
    exact: true,
    component: props => (
      <Suspense fallback={<Loading />}>
        <Reports {...props} />
      </Suspense>
    ),
  },
]
