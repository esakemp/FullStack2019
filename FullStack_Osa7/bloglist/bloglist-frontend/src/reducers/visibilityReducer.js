const visibilityReducer = (state = false, action) => {
  switch (action.type) {
  case 'SHOW':
    return state = action.data
  case 'HIDE':
    return state = action.data
  default: return state
  }
}

export const show = () => {
  return dispatch => {
    dispatch({
      type: 'SHOW',
      data: true
    })
  }
}
export const hide = () => {
  return dispatch => {
    dispatch({
      type: 'HIDE',
      data: false
    })
  }
}

export default visibilityReducer