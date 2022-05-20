import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import Connex from '@vechain/connex'
import Promise from 'bluebird'

import AuctionsComponent from '../../components/explore/Auctions/'
import Banner from '../../components/common/Banner'

import {
  marketplaceContractAddr,
  artContractAddr,
  collectibleContractAddr,
  cartoonContractAddr,
  musicContractAddr
} from '../../constants/contracts'
import { NODE, NETWORK } from '../../constants/'
import marketplaceABI from '../../constants/abi/marketplace'

import { findMethodABI, useInterval } from '../../helpers/methods'

import agent from '../../api/'

const created = [{
  value: 'all',
  label: 'All Category'
}, {
  value: artContractAddr,
  label: 'Art'
}, {
  value: musicContractAddr,
  label: 'Music'
}, {
  value: collectibleContractAddr,
  label: 'Collectible'
}, {
  value: cartoonContractAddr,
  label: 'Cartoon'
}]

const Auctions = () => {
  const [addresses, setAddresses] = useState([])
  const [names, setNames] = useState([])
  const [saleTokens, setSaleTokens] = useState([])
  const [tokenURIs, setTokenURIs] = useState([])
  const [metadata, setMetadata] = useState([])
  const [collections, setCollections] = useState(created)
  const [category, setCategory] = useState('created')
  const [collection, setCollection] = useState('all')
  const [sortOption, setSortOption] = useState('newest')
  const [contracts, setContracts] = useState([])
  const [loaded, setLoaded] = useState('false')
  useEffect(async () => {
    const res = await agent.contract.getContracts()
    console.log("contracts:", res.data)
    setContracts([...res.data])
    let contractAddrs = []
    if (category === 'collections') {
      let curCollections = [{
        value: 'all',
        label: 'All Category'
      }]
      res.data.map(contract => {
        curCollections.push({
          value: contract.contractAddress,
          label: contract.name
        })
      })
      console.log('collectiosn in useEffect:', curCollections)
      setCollections([...curCollections])
    }
    if (collection === 'all') {
      if (category === 'created') {
        contractAddrs = [
          artContractAddr,
          musicContractAddr,
          collectibleContractAddr,
          cartoonContractAddr
        ]
      } else {
        res.data.map(contract => contractAddrs.push(contract.contractAddress))
      }
    } else {
      // contractAddrs = [curCollection]
    }
    loadSales(contractAddrs, res.data, category)
  }, []);
  useInterval(
    () => {
      updatePrice()
    },
    5000
  )
  const updatePrice = async () => {
    const getCurrentPriceABI = findMethodABI(marketplaceABI, 'getCurrentPrice')
    const connex = new Connex({
      node: NODE,
      network: NETWORK
    })
    let curMeta = metadata
    const getCurrentPriceMethod = connex.thor.account(marketplaceContractAddr).method(getCurrentPriceABI)
    await Promise.all(curMeta.map(async collection => await Promise.all(collection.map(async nft => nft.price = (await getCurrentPriceMethod.call(nft.contract, nft.tokenId)).decoded[0]))))
    setMetadata([...curMeta])
  }
  const loadSales = async (contractAddresses, contracts, category) => {
    let nms = [], saleTkns = [], tknURIs = [], metadts = []
    const connex = new Connex({
      node: NODE,
      network: NETWORK
    })
    await Promise.all(contractAddresses.map(async addr => {
      console.log('contract:', addr, contracts, category)
      let prettyUrl = false, contract
      if (category === 'collections') {
        console.log('checking the contract property')
        contract = contracts.find(ctrct => ctrct.contractAddress === addr)
        console.log('my contract:', contract)
        prettyUrl = contract.prettyUrl
      }
      let uris = [], metadt = []
      const nameABI = { 'constant': true, 'inputs': [], 'name': 'name', 'outputs': [{ 'name': '', 'type': 'string' }], 'payable': false, 'stateMutability': 'pure', 'type': 'function' }
      const nameMethod = connex.thor.account(addr).method(nameABI)
      const nameRes = await nameMethod.call()
      nms.push(nameRes.decoded[0])
      const getSaleTokensABI = findMethodABI(marketplaceABI, 'getSaleTokens')
      const getSaleTokensMethod = connex.thor.account(marketplaceContractAddr).method(getSaleTokensABI)
      const getSaleTokensRes = await getSaleTokensMethod.call(addr)
      console.log('saletokens:', getSaleTokensRes)
      saleTkns.push(getSaleTokensRes.decoded[0])
      const tokenURIABI = findMethodABI(marketplaceABI, 'tokenURI')
      const tokenURIMethod = connex.thor.account(marketplaceContractAddr).method(tokenURIABI)
      const getCurrentPriceABI = findMethodABI(marketplaceABI, 'getCurrentPrice')
      const getCurrentPriceMethod = connex.thor.account(marketplaceContractAddr).method(getCurrentPriceABI)
      await Promise.all(getSaleTokensRes.decoded[0].map(async tkn => {
        const tokenId = parseInt(tkn)
        const getAuctionABI = findMethodABI(marketplaceABI, 'getAuction')
        const getAuctionMethod = connex.thor.account(marketplaceContractAddr).method(getAuctionABI)
        const auctionRes = await getAuctionMethod.call(addr, tokenId)
        console.log('token:', tkn)
        const tknURIRes = await tokenURIMethod.call(addr, tokenId)
        console.log('tokenURI:', tknURIRes)
        let uri = prettyUrl ? (tknURIRes.decoded[0] + '.json') : tknURIRes.decoded[0]
        console.log('uri:', uri)
        uris.push(uri)
        try {
          const metaRes = await axios.get(uri)
          const image = prettyUrl ? (tknURIRes.decoded[0] + '.png') : metaRes.data.image
          const priceRes = await getCurrentPriceMethod.call(addr, tokenId)
          const price = parseFloat(priceRes.decoded[0])
          let collectionName
          if (category === 'created') {
            if (addr === artContractAddr)
              collectionName = 'art'
            else if (addr === cartoonContractAddr)
              collectionName = 'cartoon'
            else if (addr === collectibleContractAddr)
              collectionName = 'collectible'
            else
              collectionName = 'music'
          }
          const groupImage = category === 'created' ? `/assets/images/collections/${collectionName}.jpg` : contract.symbolImg
          if (auctionRes.decoded[3]) {
            const dur = parseInt(auctionRes.decoded[3]), start = parseInt(auctionRes.decoded[4])
            if (dur > 0 && new Date((start + dur) * 1000).getTime() > new Date().getTime()) {
              console.log('start:', start, dur)
              console.log('ending date:', new Date((start + dur) * 1000).getTime())
              setLoaded(true)
              metadt.push({ ...metaRes.data, contract: addr, tokenId, price, image, group: nameRes.decoded[0], groupImage: groupImage, endAt: new Date((start + dur) * 1000).getTime() })
            }
          }
        } catch (err) {
          console.log('error:', err)
        }
      }))
      if (metadt.length > 0) {
        metadts.push(metadt)
        setMetadata([...metadts])
      }
    }))
    setAddresses(contractAddresses)
    setNames(nms)
    setSaleTokens(saleTkns)
    setTokenURIs(tknURIs)
    setMetadata(metadts)
  }
  const onChangeCategory = cat => {
    console.log('change category:', cat)
    setMetadata([])
    setCategory(cat)
    setCollection('all')
    if (cat === 'created') {
      setCollections(created)
      loadSales([
        artContractAddr,
        musicContractAddr,
        collectibleContractAddr,
        cartoonContractAddr
      ], contracts, cat)
    } else {
      let curCollections = [{
        value: 'all',
        label: 'All Category'
      }], curContracts = []
      contracts.filter(contract => contract.category === 'Collection').map(contract => {
        curCollections.push({
          value: contract.contractAddress,
          label: contract.name
        })
        curContracts.push(contract.contractAddress)
      })
      setCollections([...curCollections])
      loadSales(curContracts, contracts, cat)
    }
  }
  const onChangeCollection = collection => {
    setCollection(collection)
    let addrs = []
    if (collection === 'all') {
      if (category === 'created') {
        addrs = [
          artContractAddr,
          musicContractAddr,
          collectibleContractAddr,
          cartoonContractAddr
        ]
      } else {
        contracts.map(contract => addrs.push(contract.contractAddress))
      }
    } else {
      addrs = [collection]
    }
    loadSales(addrs, contracts, category)
  }
  return <Fragment>
    <Banner title="VNFT's Live Auction" subtitle='Auction' />
    <AuctionsComponent
      metadata={metadata}
      category={category}
      collections={collections}
      collection={collection}
      sortOption={sortOption}
      loaded={loaded}
      setCategory={onChangeCategory}
      setCollection={onChangeCollection}
      setSortOption={setSortOption}
    />
  </Fragment>
}

export default Auctions