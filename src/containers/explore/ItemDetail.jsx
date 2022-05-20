import { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Connex from '@vechain/connex'
import axios from 'axios'
import BigNumber from 'bignumber.js'

import Banner from '../../components/common/Banner'
import ItemDetailComponent from '../../components/explore/ItemDetail'

import marketplaceABI from '../../constants/abi/marketplace'

import {
  marketplaceContractAddr,
  artContractAddr,
  collectibleContractAddr,
  cartoonContractAddr,
  musicContractAddr
} from '../../constants/contracts'

import { connectWallet } from '../../actions/auth'
import { startAction, endAction } from '../../actions/common'

import { NODE, NETWORK } from '../../constants/index'
import customNFTABI from '../../constants/abi/custom'
import VeThugsABI from '../../constants/abi/vethugs'

import { findMethodABI, sleep, useInterval } from '../../helpers/methods'

import agent from '../../api/'

const ItemDetail = ({ contract, tokenId }) => {
  const [metadata, setMetadata] = useState({})
  const [seller, setSeller] = useState('')
  const [stPrice, setStPrice] = useState(0)
  const [edPrice, setEdPrice] = useState(0)
  const [duration, setDuration] = useState(0)
  const [startedAt, setStartedAt] = useState(-1)
  const [endAt, setEndAt] = useState(-1)
  const [price, setPrice] = useState(0)
  const [auctionPrice, setAuctionPrice] = useState(0)
  const [collection, setCollection] = useState('')
  const [auction, setAuction] = useState(false)
  const [to, setTo] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let currentUser = auth.currentUser
  const customs = [
    artContractAddr,
    collectibleContractAddr,
    cartoonContractAddr,
    musicContractAddr
  ]
  const connex = new Connex({
    node: NODE,
    network: NETWORK
  })
  useEffect(async () => {
    let address
    if (!currentUser) {
      let address = localStorage.getItem('wallet')
      if (address !== null) {
        dispatch(connectWallet(address))
      }
    }
    const res = await agent.contract.getContracts()
    const contracts = res.data
    let pretty = false
    if (!customs.includes(contract)) {
      let ctrct = contracts.find(con => con.contractAddress === contract)
      if (ctrct) {
        pretty = ctrct.prettyUrl
        setCollection(ctrct.name)
      }
    } else {
      if (contract === artContractAddr) {
        setCollection('Art')
      } else if (contract === collectibleContractAddr) {
        setCollection('Collectible')
      } else if (contract === cartoonContractAddr) {
        setCollection('Cartoon')
      } else {
        setCollection('Music')
      }
    }
    const connex = new Connex({
      node: NODE,
      network: NETWORK
    })
    const tokenURIABI = findMethodABI(marketplaceABI, 'tokenURI')
    const tokenURIMethod = connex.thor.account(marketplaceContractAddr).method(tokenURIABI)
    const tknURIRes = await tokenURIMethod.call(contract, tokenId)
    const uri = pretty ? tknURIRes.decoded[0] + '.json' : tknURIRes.decoded[0]
    let metadataRes = await axios.get(uri)
    console.log('metadata:', metadataRes.data)
    const getAuctionABI = findMethodABI(marketplaceABI, 'getAuction')
    const getAuctionMethod = connex.thor.account(marketplaceContractAddr).method(getAuctionABI)
    const auctionRes = await getAuctionMethod.call(contract, tokenId)
    console.log('auctionRes:', auctionRes)
    const start = parseInt(auctionRes.decoded[4]), dur = parseInt(auctionRes.decoded[3])
    setSeller(auctionRes.decoded[3] ? auctionRes.decoded[0] : address)
    setStPrice(parseFloat(auctionRes.decoded[1]))
    setEdPrice(parseFloat(auctionRes.decoded[2]))
    setDuration(dur)
    setStartedAt(start)
    console.log('duration:', start, dur)
    if (auctionRes.decoded[3]) {
      if (dur === 0) {
        setEndAt(0)
      } else if (dur > 0 && (start + dur) * 1000 > new Date().getTime()) {
        console.log('checking time:', new Date((start + dur) * 1000).getTime(), new Date().getTime())
        setEndAt(new Date((start + dur) * 1000).getTime())
      }
    }
    const getCurrentPriceABI = findMethodABI(marketplaceABI, 'getCurrentPrice')
    const getCurrentPriceMethod = connex.thor.account(marketplaceContractAddr).method(getCurrentPriceABI)
    const priceRes = await getCurrentPriceMethod.call(contract, tokenId)
    if (pretty) {
      metadataRes.data.image = tknURIRes.decoded[0] + '.png'
    }
    setPrice(parseFloat(priceRes.decoded[0]))
    console.log('metadata:', metadataRes.data)
    setMetadata(metadataRes.data)
  }, [])
  const buy = async () => {
    const address = currentUser.address
    const connex = new Connex({
      node: NODE,
      network: NETWORK
    })
    try {
      const getAuctionABI = findMethodABI(marketplaceABI, 'getAuction')
      const getAuctionMethod = connex.thor.account(marketplaceContractAddr).method(getAuctionABI)
      const auctionRes = await getAuctionMethod.call(contract, tokenId)
      const getCurrentPriceABI = findMethodABI(marketplaceABI, 'getCurrentPrice')
      const getCurrentPriceMethod = connex.thor.account(marketplaceContractAddr).method(getCurrentPriceABI)
      const currentPriceRes = await getCurrentPriceMethod.call(contract, tokenId)
      const price = parseFloat(currentPriceRes.decoded[0])
      const balanceOfABI = findMethodABI(marketplaceABI, 'balanceOf')
      const balanceOfMethod = connex.thor.account(marketplaceContractAddr).method(balanceOfABI)
      let balanceRes = await balanceOfMethod.call(contract, address)
      console.log('balanceRes:', balanceRes.decoded[0])
      const balance = balanceRes.decoded[0]
      if (customs.includes(contract)) {
        const bidABI = findMethodABI(marketplaceABI, 'bidRoyalty')
        const bidMethod = connex.thor.account(marketplaceContractAddr)
          .method(bidABI)
          .value(price)
          .caller(address)
          .gas(1000000)
          .gasPrice('1000000000000000')
        const bidRes = await bidMethod.call(contract, tokenId)
        const res = await connex.vendor.sign('tx', [bidMethod.asClause(contract, tokenId)]).request()
        dispatch(startAction())
        while (1) {
          balanceRes = await balanceOfMethod.call(contract, address)
          if (balanceRes.decoded[0] !== balance) {
            break;
          }
          await sleep(1000)
        }
      } else {
        const bidABI = findMethodABI(marketplaceABI, 'bid')
        const bidMethod = connex.thor.account(marketplaceContractAddr)
          .method(bidABI)
          .value(price + '000000000000000000')
          .caller(address)
          .gas(1000000)
          .gasPrice('1000000000000000')
        const bidRes = await bidMethod.call(contract, tokenId)
        const res = await connex.vendor.sign('tx', [bidMethod.asClause(contract, tokenId)]).request()
        dispatch(startAction())
        while (1) {
          balanceRes = await balanceOfMethod.call(contract, address)
          if (balanceRes.decoded[0] !== balance) {
            break;
          }
          await sleep(1000)
        }
      }
      dispatch(endAction())
      navigate('/author/123')
    } catch (err) {
      console.log('error:', err)
    }
  }
  // useInterval(
  //   () => {
  //     console.log("updating price")
  //     updatePrice()
  //   },
  //   5000
  // )
  const updatePrice = async () => {
    console.log('updating price')
    const getCurrentPriceABI = findMethodABI(marketplaceABI, 'getCurrentPrice')
    const getCurrentPriceMethod = connex.thor.account(marketplaceContractAddr).method(getCurrentPriceABI)
    console.log('updating price:', contract, tokenId)
    const priceRes = await getCurrentPriceMethod.call(contract, tokenId)
    setPrice(parseFloat(priceRes.decoded[0]))
  }
  const createSale = async () => {
    const current = Date.now()
    const todate = new Date(to).getTime()
    const diffTime = Math.abs(todate - current);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const { address } = currentUser
    let abi
    let hasRoyalty = false
    if ([artContractAddr, cartoonContractAddr, collectibleContractAddr, musicContractAddr].includes(contract)) {
      abi = customNFTABI
      hasRoyalty = true
    } else {
      abi = VeThugsABI
    }
    try {
      const approveABI = findMethodABI(customNFTABI, 'approve')
      let approveMethod = connex.thor.account(contract)
        .method(approveABI)
        .caller(address)
      dispatch(startAction())
      const createAuctionABI = findMethodABI(marketplaceABI, 'createAuction')
      const createAuctionMethod = connex.thor.account(marketplaceContractAddr)
        .method(createAuctionABI)
        .caller(address)
      const startPrice = auction ? stPrice : auctionPrice, endPrice = auction ? edPrice : auctionPrice, time = auction ? diffDays * 86400 : 0
      await connex.vendor.sign('tx', [approveMethod.asClause(marketplaceContractAddr, tokenId), createAuctionMethod.asClause(contract, tokenId, BigNumber(startPrice).times(BigNumber('1000000000000000000')).toFixed(), BigNumber(endPrice).times(BigNumber('1000000000000000000')).toFixed(), time)]).request()
      dispatch(endAction())
      navigate('/explore/all')
    } catch (err) {
      console.log('error:', err)
    }
  }
  const removeSale = async () => {
    const { address } = currentUser
    const cancelAuctionABI = findMethodABI(marketplaceABI, 'cancelAuction')
    console.log('removing sale:', contract, tokenId, address)
    const cancelAuctionMethod = connex.thor.account(marketplaceContractAddr)
      .method(cancelAuctionABI)
      .caller(address)
      .gas(1000000)
      .gasPrice('1000000000000000')
    const res = await cancelAuctionMethod.call(contract, tokenId)
    console.log('remove sale res:', res)
    await connex.vendor.sign('tx', [cancelAuctionMethod.asClause(contract, tokenId)]).request()
    navigate('/author/123')
  }
  return <Fragment>
    <Banner title='Item Details Page' subtitle='Item Details' />
    <ItemDetailComponent
      metadata={metadata}
      contract={contract}
      tokenId={tokenId}
      seller={seller}
      price={BigNumber(price).dividedBy(BigNumber('1000000000000000000')).toFixed(3)}
      collection={collection}
      duration={duration}
      endAt={endAt}
      buy={buy}
      currentUser={currentUser}
      auction={auction}
      to={to}
      stPrice={stPrice}
      edPrice={edPrice}
      auctionPrice={auctionPrice}
      address={!!currentUser ? currentUser.address : ''}
      hasRoyalty={[
        artContractAddr,
        cartoonContractAddr,
        collectibleContractAddr,
        musicContractAddr
      ].includes(contract)}
      createSale={createSale}
      onChangeAuction={setAuction}
      onChangeTo={setTo}
      onChangeAuctionPrice={setAuctionPrice}
      onChangeStPrice={setStPrice}
      onChangeEdPrice={setEdPrice}
      removeSale={removeSale}
    />
  </Fragment>
}

export default ItemDetail