import {
  CONNECT_WALLET,
  DISCONNECT_WALLET,
  UPDATE_PROFILE
} from '../constants/actionTypes/auth'

export const connectWallet = address => ({ type: CONNECT_WALLET, address })

export const disconnectWallet = () => ({ type: DISCONNECT_WALLET })

export const updateProfile = userInfo => ({ type: UPDATE_PROFILE, userInfo })