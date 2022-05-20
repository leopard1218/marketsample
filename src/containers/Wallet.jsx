import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Connex from '@vechain/connex'

import { connectWallet, updateProfile } from '../actions/auth'

import Banner from '../components/common/Banner'
import WalletComponent from '../components/Wallet'

import agent from '../api/'
// import WalletComponent from '../components/Wallet'

const Wallet = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const connect = () => {
    let newvendor = new Connex.Vendor('test')
    newvendor
      .sign('cert', {
        purpose: 'identification',
        payload: {
          type: 'text',
          content: 'Hello.\n Welcome to our BlackVeMarket. \n You can buy and sell what you want here.'
        }
      })
      .request()
      .then(async res => {
        localStorage.setItem('wallet', res.annex.signer)
        console.log('walletaddress:', res.annex.signer)
        dispatch(connectWallet(res.annex.signer))
        const addr = res.annex.signer
        if (addr) {
          dispatch(connectWallet(addr))
          const res = await agent.user.getMe(addr)
          console.log('my data:', res.data)
          if (res.data !== null) {
            dispatch(updateProfile(res.data))
          }
        }
        navigate('/author/123')
      })
  }
  return <Fragment>
    <Banner title='Connect your wallet' subtitle='Connect with one of the available wallets' />
    <WalletComponent connectWallet={connect} />
  </Fragment>
}

export default Wallet