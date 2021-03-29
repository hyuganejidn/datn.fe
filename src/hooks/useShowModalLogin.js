import * as _types from '@/modules/home/store/action_types'

const types = {
  login: _types.APP_UPDATE_IS_LOGIN,
  report: _types.APP_UPDATE_IS_REPORT,
}

export const useShouldShowModal = ({ dispatch, isAuth, type, payload = null }) => {
  if (isAuth) return false

  dispatch({ payload, type: types[type] })
  return true
}
