import {
  CONNECT_WALLET,
  DISCONNECT_WALLET,
  UPDATE_PROFILE
} from '../constants/actionTypes/auth'

const INITIAL_STATE = {
  currentUser: null,
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECT_WALLET:
      return {
        ...state,
        currentUser: {
          address: action.address
        }
      }
    case DISCONNECT_WALLET:
      return {
        ...state,
        currentUser: null
      }
    case UPDATE_PROFILE:
      const { userInfo } = action
      return {
        ...state,
        currentUser: {
          ...userInfo,
          addr: userInfo.address,
          address: userInfo.wallet
        }
      }
    default:
      return state
  }
}

export default reducer