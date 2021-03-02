import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

export const makeGetErrorsLogin = () => {
  const stateSelect = createSelector(
    state => state.auth,
    auth => auth.errors.login
  )

  return useSelector(stateSelect)
}

export const makeGetMe = () => {
  const stateSelect = createSelector(
    state => state.auth,
    auth => auth.user
  )

  return useSelector(stateSelect)
}
