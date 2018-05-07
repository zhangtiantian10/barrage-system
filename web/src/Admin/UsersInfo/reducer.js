export default (state = {content: [], totalElements: 0}, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return Object.assign({}, state, {...action.data})
    default:
      return state
  }
}