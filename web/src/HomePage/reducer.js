export default (state = {barrageSort: [], giftSort: []}, action) => {
  switch (action.type) {
    case 'GET_BARRAGE_SORT':
      return Object.assign({}, state, {barrageSort: [...action.data]})
    case 'GET_GIFT_SORT':
      return Object.assign({}, state, {giftSort: [...action.data]})
    default:
      return state
  }
}