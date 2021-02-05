import * as types from './action_types'

const initialState = {
  test: 'test',
}
const reducer = (state = initialState, { type, payload }) => {
  console.log(payload)
  switch (type) {
    case types.TEST:
      return state
    default:
      return state
  }
}
export default reducer
