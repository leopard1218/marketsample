import {
  START_ACTION,
  END_ACTION
} from '../constants/actionTypes/common'

const INITIAL_STATE = {
  loading: false
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_ACTION:
      return {
        ...state,
        loading: true
      }
    case END_ACTION:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default reducer