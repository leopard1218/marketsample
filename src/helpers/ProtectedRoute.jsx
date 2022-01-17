import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router'

import Preloader from '../components/Preloader'

import { connectWallet } from '../actions/auth'

const ProtectedRoute = props => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  let currentUser = auth.currentUser
  // const address = localStorage.getItem('wallet')
  if (!!currentUser) {
    return <React.Fragment>{props.children}</React.Fragment>
  }
  let address = localStorage.getItem('wallet')
  if (address !== null) {
    dispatch(connectWallet(address))
    return <Preloader />
  }
  return <Navigate to='/wallet' />
}

export default ProtectedRoute