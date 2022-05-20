import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { connectWallet, disconnectWallet } from '../actions/auth'

import HeaderComponent from '../components/common/Header'

import agent from '../api/'

import { updateProfile } from '../actions/auth'

const Header = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = auth
  useEffect(async () => {
    if (!currentUser || !currentUser.address) {
      let addr = localStorage.getItem('wallet')
      if (addr) {
        dispatch(connectWallet(addr))
        const res = await agent.user.getMe(addr)
        console.log('my data:', res.data)
        if (res.data !== null) {
          dispatch(updateProfile(res.data))
        }
      }
    }
  }, [])
  const disconnect = () => {
    localStorage.removeItem('wallet')
    dispatch(disconnectWallet())
    navigate('/wallet')
  }
  return <HeaderComponent address={(!!currentUser && !!currentUser.address) ? currentUser.address : ''} disconnect={disconnect} />
}

export default Header