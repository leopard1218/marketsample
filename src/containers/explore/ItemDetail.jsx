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
import { startAction, endAction, showToast, hideToast } from '../../actions/common'

import { NODE, NETWORK } from '../../constants/index'
import customNFTABI from '../../constants/abi/custom'

import { findMethodABI, sleep, useInterval } from '../../helpers/methods'

import agent from '../../api/'

const customs = [
  artContractAddr,
  collectibleContractAddr,
  cartoonContractAddr,
  musicContractAddr
]

const ItemDetail = ({ contract, tokenId }) => {
  const [metadata, setMetadata] = useState({})
  const [seller, setSeller] = useState('')
  const [stPrice, setStPrice] = useState(0)
  const [edPrice, setEdPrice] = useState(0)
  const [duration, setDuration] = useState(0)
  const [endAt, setEndAt] = useState(-1)
  const [price, setPrice] = useState(-1)
  const [royalty, setRoyalty] = useState(0)
  const [auctionPrice, setAuctionPrice] = useState(0)
  const [collection, setCollection] = useState('')
  const [auction, setAuction] = useState(false)
  const [destination, setDestination] = useState('')
  const [creator, setCreator] = useState('')
  const [download, setDownload] = useState('')
  const [to, setTo] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let currentUser = auth.currentUser
  const connex = new Connex({
    node: NODE,
    network: NETWORK
  })
  useEffect(() => {
    const init = async () => {
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
      const connex = new Connex({
        node: NODE,
        network: NETWORK
      })
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
        const creatorRes = await connex.thor.account(contract).method(findMethodABI(customNFTABI, 'getCreator')).call(tokenId)
        setCreator(creatorRes.decoded[0])
      }
      const tokenURIABI = findMethodABI(marketplaceABI, 'tokenURI')
      const tokenURIMethod = connex.thor.account(marketplaceContractAddr).method(tokenURIABI)
      const tknURIRes = await tokenURIMethod.call(contract, tokenId)
      const uri = pretty ? tknURIRes.decoded[0] + '.json' : tknURIRes.decoded[0]
      let metadataRes = await axios.get(uri)
      const getRoyaltyABI = findMethodABI(customNFTABI, 'getRoyalty')
      const getRoyaltyMethod = connex.thor.account(contract).method(getRoyaltyABI)
      const getRoyaltyRes = await getRoyaltyMethod.call(tokenId)
      setRoyalty(parseInt(getRoyaltyRes.decoded[0]))
      const getAuctionABI = findMethodABI(marketplaceABI, 'getAuction')
      const getAuctionMethod = connex.thor.account(marketplaceContractAddr).method(getAuctionABI)
      const auctionRes = await getAuctionMethod.call(contract, tokenId)
      if (!auctionRes.reverted) {
        const start = parseInt(auctionRes.decoded[4]), dur = parseInt(auctionRes.decoded[3])
        setSeller(auctionRes.decoded[3] ? auctionRes.decoded[0] : address)
        if (auctionRes.decoded[3]) {
          setStPrice(parseFloat(auctionRes.decoded[1]))
          setEdPrice(parseFloat(auctionRes.decoded[2]))
          setDuration(dur)
          if (dur === 0) {
            setEndAt(0)
          } else if (dur > 0) {
            setEndAt(new Date((start + dur) * 1000).getTime())
          }
        }
        const getCurrentPriceABI = findMethodABI(marketplaceABI, 'getCurrentPrice')
        const getCurrentPriceMethod = connex.thor.account(marketplaceContractAddr).method(getCurrentPriceABI)
        const priceRes = await getCurrentPriceMethod.call(contract, tokenId)
        console.log('setting price:', parseInt(priceRes.decoded[0]))
        setPrice(parseInt(priceRes.decoded[0]))
      }
      if (pretty) {
        metadataRes.data.image = tknURIRes.decoded[0] + '.png'
      }
      const downloadLink = pretty ? tknURIRes.decoded[0] + '.png' : metadataRes.data.properties.files[0].uri
      console.log('downloadlink:', downloadLink)
      setDownload(downloadLink)
      console.log('metadata:', metadataRes.data)
      setMetadata(metadataRes.data)
    }
    init()
  }, [contract, currentUser, dispatch, tokenId])
  const buy = async () => {
    const address = currentUser.address
    const connex = new Connex({
      node: NODE,
      network: NETWORK
    })
    try {
      const getCurrentPriceABI = findMethodABI(marketplaceABI, 'getCurrentPrice')
      const getCurrentPriceMethod = connex.thor.account(marketplaceContractAddr).method(getCurrentPriceABI)
      const currentPriceRes = await getCurrentPriceMethod.call(contract, tokenId)
      const price = currentPriceRes.decoded[0]
      const balanceOfABI = findMethodABI(marketplaceABI, 'balanceOf')
      const balanceOfMethod = connex.thor.account(marketplaceContractAddr).method(balanceOfABI)
      let balanceRes = await balanceOfMethod.call(contract, address)
      const balance = balanceRes.decoded[0]
      if (customs.includes(contract)) {
        const bidABI = findMethodABI(marketplaceABI, 'bidRoyalty')
        const bidMethod = connex.thor.account(marketplaceContractAddr)
          .method(bidABI)
          .value(price)
          .caller(address)
          .gas(1000000)
          .gasPrice('1000000000000000')
        await connex.vendor.sign('tx', [bidMethod.asClause(contract, tokenId)]).request()
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
        console.log('bidding:', price)
        const bidMethod = connex.thor.account(marketplaceContractAddr)
          .method(bidABI)
          .value(price)
          .caller(address)
          .gas(1000000)
          .gasPrice('1000000000000000')
        await connex.vendor.sign('tx', [bidMethod.asClause(contract, tokenId)]).request()
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
      navigate('/author')
    } catch (err) {
      dispatch(endAction())
      console.log('error:', err)
    }
  }
  useInterval(
    () => {
      updatePrice()
    },
    5000
  )
  const updatePrice = async () => {
    const getCurrentPriceABI = findMethodABI(marketplaceABI, 'getCurrentPrice')
    const getCurrentPriceMethod = connex.thor.account(marketplaceContractAddr).method(getCurrentPriceABI)
    const priceRes = await getCurrentPriceMethod.call(contract, tokenId)
    if (!priceRes.reverted) {
      setPrice(parseInt(priceRes.decoded[0]))
    }
  }
  const createSale = async () => {
    const current = Date.now()
    const todate = new Date(to).getTime()
    const diffTime = Math.abs(todate - current);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const { address } = currentUser
    if (auction && stPrice <= edPrice) {
      dispatch(showToast('Creating Sale', 'Start Price must be bigger than End Price'))
      setTimeout(() => dispatch(hideToast()), 3000)
      return
    } else if (!auction && auctionPrice === 0) {
      dispatch(showToast('Creating Sale', 'Price must be bigger than 0'))
      setTimeout(() => dispatch(hideToast()), 3000)
      return
    }
    if (auction && todate <= current) {
      dispatch(showToast('Creating Sale', 'Please select correct date'))
      setTimeout(() => dispatch(hideToast()), 3000)
      return
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
      await connex.vendor.sign('tx', [approveMethod.asClause(marketplaceContractAddr, tokenId), createAuctionMethod.asClause(contract, tokenId, BigNumber(startPrice).times(BigNumber('1000000000000000000')).toFixed(0), BigNumber(endPrice).times(BigNumber('1000000000000000000')).toFixed(0), time)]).request()
      dispatch(endAction())
      if (auction) {
        navigate('/explore/auctions')
      } else {
        navigate('/explore/all')
      }
    } catch (err) {
      dispatch(endAction())
      console.log('error:', err)
    }
  }
  const removeSale = async () => {
    const { address } = currentUser
    const cancelAuctionABI = findMethodABI(marketplaceABI, 'cancelAuction')
    const cancelAuctionMethod = connex.thor.account(marketplaceContractAddr)
      .method(cancelAuctionABI)
      .caller(address)
      .gas(1000000)
      .gasPrice('1000000000000000')
    await cancelAuctionMethod.call(contract, tokenId)
    await connex.vendor.sign('tx', [cancelAuctionMethod.asClause(contract, tokenId)]).request()
    navigate('/author')
  }
  const transfer = async () => {
    if (!destination) {
      return
    }
    const approveABI = findMethodABI(customNFTABI, 'approve')
    const { address } = currentUser
    let approveMethod = connex.thor.account(contract)
      .method(approveABI)
      .caller(address)
    dispatch(startAction())
    const transferABI = findMethodABI(marketplaceABI, 'transfer')
    const transferMethod = connex.thor.account(marketplaceContractAddr)
      .method(transferABI)
      .caller(address)
    try {
      await connex.vendor.sign('tx', [approveMethod.asClause(marketplaceContractAddr, tokenId), transferMethod.asClause(contract, destination, tokenId)]).request()
      dispatch(endAction())
      navigate('/author')
    } catch (err) {
      dispatch(endAction())
      console.log('error:', err)
    }
  }
  return <Fragment>
    <Banner title='Item Details Page' subtitle='Item Details' />
    <ItemDetailComponent
      metadata={metadata}
      contract={contract}
      tokenId={tokenId}
      seller={seller}
      custom={customs.includes(contract)}
      price={BigNumber(price).dividedBy(BigNumber('1000000000000000000')).toFixed(0)}
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
      creator={creator}
      hasRoyalty={[
        artContractAddr,
        cartoonContractAddr,
        collectibleContractAddr,
        musicContractAddr
      ].includes(contract)}
      destination={destination}
      download={download}
      royalty={royalty}
      createSale={createSale}
      transfer={transfer}
      onChangeAuction={setAuction}
      onChangeTo={setTo}
      onChangeAuctionPrice={setAuctionPrice}
      onChangeStPrice={setStPrice}
      onChangeEdPrice={setEdPrice}
      onChangeDestination={setDestination}
      removeSale={removeSale}
    />
  </Fragment>
}

export default ItemDetail