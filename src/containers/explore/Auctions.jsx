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
  const [metadata, setMetadata] = useState([])
  const [collections, setCollections] = useState(created)
  const [category, setCategory] = useState('created')
  const [collection, setCollection] = useState('all')
  const [sortOption, setSortOption] = useState('newest')
  const [contracts, setContracts] = useState([])
  const [loaded, setLoaded] = useState('false')
  useEffect(() => {
    const init = async () => {
      let ctrcts = contracts
      if (ctrcts.length === 0) {
        const res = await agent.contract.getContracts()
        ctrcts = res.data
        setContracts([...res.data])
      }
      let contractAddrs = []
      if (category === 'collections') {
        let curCollections = [{
          value: 'all',
          label: 'All Category'
        }]
        ctrcts.filter(contract => contract.category === 'Collection').map(contract => curCollections.push({
          value: contract.contractAddress,
          label: contract.name
        })
        )
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
          ctrcts.filter(contract => contract.category === 'Collection').map(contract => contractAddrs.push(contract.contractAddress))
        }
      } else {
        contractAddrs = [collection]
      }
      loadSales(contractAddrs, ctrcts, category)
    }
    init()
  }, [category, collection, contracts]);
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
    let nms = [], saleTkns = [], metadts = []
    const connex = new Connex({
      node: NODE,
      network: NETWORK
    })
    setMetadata([])
    await Promise.all(contractAddresses.map(async addr => {
      let contract, prettyUrl = false
      if (category === 'collections') {
        contract = contracts.find(ctrct => ctrct.contractAddress === addr)
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
        const tknURIRes = await tokenURIMethod.call(addr, tokenId)
        let uri = prettyUrl ? (tknURIRes.decoded[0] + '.json') : tknURIRes.decoded[0]
        uris.push(uri)
        try {
          const metaRes = await axios.get(uri)
          const image = prettyUrl ? (tknURIRes.decoded[0] + '.png') : metaRes.data.image
          const priceRes = await getCurrentPriceMethod.call(addr, tokenId)
          const price = parseFloat(priceRes.decoded[0])
          let collectionName
          let group = nameRes.decoded[0]
          if (category === 'created') {
            if (addr === artContractAddr) {
              collectionName = 'art'
              group = 'Art'
            }
            else if (addr === cartoonContractAddr) {
              collectionName = 'cartoon'
              group = 'Cartoon'
            }
            else if (addr === collectibleContractAddr) {
              collectionName = 'collectibles'
              group = 'Collectible'
            }
            else {
              collectionName = 'music'
              group = 'Music'
            }
          }
          const groupImage = category === 'created' ? `/assets/images/collections/${collectionName}.jpg` : contract.symbolImg
          if (auctionRes.decoded[3]) {
            const dur = parseInt(auctionRes.decoded[3]), start = parseInt(auctionRes.decoded[4])
            if (dur > 0 && new Date((start + dur) * 1000).getTime() > new Date().getTime()) {
              setLoaded(true)
              metadt.push({ ...metaRes.data, contract: addr, tokenId, price, image, group, groupImage: groupImage, endAt: new Date((start + dur) * 1000).getTime() })
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
    setMetadata(metadts)
  }
  const onChangeCategory = cat => {
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
        return curContracts.push(contract.contractAddress)
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
        contracts.filter(contract => contract.category === 'Collection').map(contract => addrs.push(contract.contractAddress))
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