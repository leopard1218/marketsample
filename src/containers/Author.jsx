import { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Connex from '@vechain/connex'
import BigNumber from 'bignumber.js'
import axios from 'axios'

import AuthorComponent from '../components/Author/'
import Banner from '../components/common/Banner'

import { artContractAddr, musicContractAddr, collectibleContractAddr, cartoonContractAddr, marketplaceContractAddr } from '../constants/contracts'
import customNFTABI from '../constants/abi/custom'
import marketplaceABI from '../constants/abi/marketplace'
import { NODE, NETWORK } from '../constants/'

import { startAction, endAction } from '../actions/common'
import { updateProfile } from '../actions/auth'

import { findMethodABI, sleep, toUppercase, toLowercase, useInterval } from '../helpers/methods'

import agent from '../api/'
//import api_res from '../constants/testApiRes.json'

const Author = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [data, setData] = useState(null)
  const [type, setType] = useState('')
  const [title, setTitle] = useState('sale')
  const [group, setGroup] = useState('collection')
  const [currency, setCurrency] = useState(0)
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState(1)
  const [royalty, setRoyalty] = useState(0)
  const [size, setSize] = useState(0)
  const [copy, setCopy] = useState(1)
  const [category, setCategory] = useState('Art')
  const [filetype, setFiletype] = useState('')
  const [banner, setBanner] = useState(null)
  const [metadata, setMetadata] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [currentSelCat, setCurrentSelCat] = useState('All Categories')
  const [apiRes, setApiRes] = useState([])
  const [editing, setEditing] = useState(false)
  const [copies, setCopies] = useState(1)
  const auth = useSelector(state => state.auth)
  const { currentUser } = auth
  const [userInfo, setUserInfo] = useState({
    name: currentUser ? (currentUser.name ? currentUser.name : '') : '',
    country: currentUser ? (currentUser.country ? currentUser.country : '') : '',
    specialize: currentUser ? (currentUser.specialize ? currentUser.specialize : '') : '',
    birthday: currentUser ? (currentUser.birthday ? currentUser.birthday : '') : '',
    address: currentUser ? (currentUser.addr ? currentUser.addr : '') : '',
    wallet: currentUser ? (currentUser.wallet ? currentUser.wallet : '') : '',
    about: currentUser ? (currentUser.about ? currentUser.about : '') : '',
    photo: currentUser ? (currentUser.photo ? currentUser.photo : '') : '',
  })
  const dispatch = useDispatch()
  let address = auth.currentUser.address
  const connex = new Connex({
    node: NODE,
    network: NETWORK
  })
  useEffect(() => {
    const init = async () => {
      let cat = ['All Categories']
      const res = await agent.contract.getContracts()
      const api_res = res.data
      setApiRes([...api_res])
      if (group === 'collection') {
        for (let i = 0; i < api_res.length; i++)
          if (api_res[i].category === 'Collection') cat.push(api_res[i].name)
      } else {
        for (let i = 0; i < api_res.length; i++)
          if (api_res[i].category !== 'Collection') cat.push(api_res[i].name)
      }
      setSubCategory(cat)
      getOwnedItem(title, toUppercase(group), currentSelCat)
    }

    init()
    if (currentUser.address) {
      setUserInfo({
        name: currentUser ? (currentUser.name ? currentUser.name : '') : '',
        country: currentUser ? (currentUser.country ? currentUser.country : '') : '',
        specialize: currentUser ? (currentUser.specialize ? currentUser.specialize : '') : '',
        birthday: currentUser ? (currentUser.birthday ? currentUser.birthday : '') : '',
        address: currentUser ? (currentUser.addr ? currentUser.addr : '') : '',
        wallet: currentUser ? (currentUser.address ? currentUser.address : '') : '',
        about: currentUser ? (currentUser.about ? currentUser.about : '') : '',
        photo: currentUser ? (currentUser.photo ? currentUser.photo : '') : '',
      })
    }
  }, [auth.currentUser, title, group, currentSelCat]);

  const onFileChanged = async e => {
    const file = e.target.files[0]
    setFiletype(file.type)
    if (file.type.startsWith('image')) {
      setType('image')
    } else if (file.type.startsWith('video')) {
      setType('video')
    } else if (file.type.startsWith('audio')) {
      setType('audio')
    }
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = e => setData(reader.result)
  }

  const create = async () => {
    let customNFTContractAddr
    if (category === 'Art') {
      customNFTContractAddr = artContractAddr
    } else if (category === 'Music') {
      customNFTContractAddr = musicContractAddr
    } else if (category === 'Collectibles') {
      customNFTContractAddr = collectibleContractAddr
    } else {
      customNFTContractAddr = cartoonContractAddr
    }
    //Uploading to IPFS
    const result = await agent.customNFT.create(address, name, description, data, filetype, banner)
    const metadataURL = result.data.metadataURL
    // const metadataURL = 'metadataURL'
    //Minting Custom NFT
    const connex = new Connex({
      node: NODE,
      network: NETWORK
    })
    const balanceOfABI = findMethodABI(marketplaceABI, 'balanceOf')
    const balanceOfMethod = connex.thor.account(marketplaceContractAddr).method(balanceOfABI)
    try {
      let balanceRes = await balanceOfMethod.call(customNFTContractAddr, address)
      const mintABI = findMethodABI(customNFTABI, 'mint')
      const mintMethod = connex.thor.account(customNFTContractAddr)
        .method(mintABI)
        .caller(address)
        .gas(1000000)
        .gasPrice('1000000000000000')
      console.log('minting:', metadataURL, copies, royalty)
      const mintOutput = await mintMethod.call(metadataURL, copies, royalty)
      console.log('mint output:', mintOutput)
      dispatch(startAction())
      /*
      const tokenId = parseInt(mintOutput.decoded[0])
      const approveABI = findMethodABI(customNFTABI, 'approve')
      let approveMethod = connex.thor.account(customNFTContractAddr)
        .method(approveABI)
        .caller(address)
      const createAuctionABI = findMethodABI(marketplaceABI, 'createAuction')
      const createAuctionMethod = connex.thor.account(marketplaceContractAddr)
        .method(createAuctionABI)
        .caller(address)
      const prc = BigNumber(price).times(BigNumber('1000000000000000000'))
      */
      await connex.vendor.sign('tx', [mintMethod.asClause(metadataURL, copies, royalty)]).request()
      //await connex.vendor.sign('tx', [mintMethod.asClause(metadataURL, copies, royalty), approveMethod.asClause(marketplaceContractAddr, tokenId), createAuctionMethod.asClause(customNFTContractAddr, tokenId, prc.toFixed(), prc.toFixed(), 0)]).request()
      dispatch(endAction())
    } catch (err) {
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
    const connex = new Connex({
      node: NODE,
      network: NETWORK
    })
    let curMeta = metadata
    const getCurrentPriceMethod = connex.thor.account(marketplaceContractAddr).method(getCurrentPriceABI)
    await Promise.all(curMeta.map(async nft => nft.price = (await getCurrentPriceMethod.call(nft.contract, nft.tokenId)).decoded[0]))
    setMetadata([...curMeta])
  }

  const getDecodedFromCall = (_res) => {
    return _res?.decoded[0]
  }

  const getItemByIndex = async (tokenInd, nftAddr, title, category, saleToks, contractABI, marketContract) => {
    const tokenURI = getDecodedFromCall(await marketContract.method(findMethodABI(contractABI, 'tokenURI')).call(nftAddr, tokenInd))
    const tokenPrc = getDecodedFromCall(await marketContract.method(findMethodABI(contractABI, 'getCurrentPrice')).call(nftAddr, tokenInd))
    try {
      let mdata = await axios.get(`${tokenURI}${category === 'Collection' ? '.json' : ''}`)
      if (category === 'Collection') {
        mdata.data.image = `${tokenURI}.png`
        mdata.data.groupImage = apiRes.find(ctr => ctr.contractAddress === nftAddr).symbolImg
      }
      if (nftAddr === artContractAddr) {
        mdata.data.title = 'Art'
        mdata.data.groupImage = '/assets/images/collections/Art.jpg'
      } else if (nftAddr === collectibleContractAddr) {
        mdata.data.title = 'Collectible'
        mdata.data.groupImage = '/assets/images/collections/Collectible.jpg'
      } else if (nftAddr === cartoonContractAddr) {
        mdata.data.title = 'Cartoon'
        mdata.data.groupImage = '/assets/images/collections/Cartoon.jpg'
      } else if (nftAddr === musicContractAddr) {
        mdata.data.title = 'Music'
        mdata.data.groupImage = '/assets/images/collections/Music.jpg'
      } else {
        const contract = apiRes.find(ctr => ctr.contractAddress === nftAddr)
        if (contract) {
          mdata.data.title = contract.name
        }
      }
      //mdata.data.name = `#${mdata.data.edition}`
      mdata.data.contract = nftAddr
      mdata.data.tokenId = tokenInd
      mdata.data.price = tokenPrc === undefined ? '-' : tokenPrc
      mdata.data.isAuction = saleToks.includes(tokenInd)
      return mdata
    } catch (err) {
      console.log(err)
      return null
    }
  }

  const getOwnedItem = async (_title, _category, _subCategory) => {
    const contractInfos = apiRes.filter(ind => { return ind.category === _category })
    const contractABI = marketplaceABI
    const marketContract = connex.thor.account(marketplaceContractAddr)
    let temp = []
    setMetadata([])
    if (_title !== 'sale') {
      await Promise.all(contractInfos.map(async contractInfo => {
        if (_subCategory === 'All Categories' || contractInfo.name === _subCategory) {
          const nftAddr = contractInfo.contractAddress
          const tokenCount = getDecodedFromCall(await marketContract.method(findMethodABI(contractABI, 'balanceOf')).call(nftAddr, auth.currentUser.address))
          let tokenIndexes = []
          for (let i = 0; i < parseInt(tokenCount); ++i) {
            tokenIndexes.push(i)
          }
          await Promise.all(tokenIndexes.map(async tokenIndex => {
            const tokenId = getDecodedFromCall(await marketContract.method(findMethodABI(contractABI, 'tokenOfOwnerByIndex')).call(nftAddr, auth.currentUser.address, tokenIndex))
            let tokenUri = getDecodedFromCall(await marketContract.method(findMethodABI(contractABI, 'tokenURI')).call(nftAddr, tokenId))
            let mdata
            try {
              mdata = await axios.get(contractInfo.prettyUrl ? tokenUri + '.json' : tokenUri)
              let groupImage
              if (contractInfo.category === 'Collection') {
                groupImage = contractInfo.symbolImg
              }
              else {
                groupImage = `/assets/images/collections/${toLowercase(contractInfo.name)}.jpg`
              }
              let image = mdata.data.image
              if (contractInfo.prettyUrl) {
                image = tokenUri + '.png'
              }
              temp.push({ ...mdata.data, contract: nftAddr, tokenId, group: contractInfo.name, groupImage, image: image })
              setMetadata([...temp])
            } catch (err) {
              console.log(err)
            }
          }))
        }
      }))
    } else {
      await Promise.all(contractInfos.map(async contractInfo => {
        if (_subCategory === 'All Categories' || contractInfo.name === _subCategory) {
          const nftAddr = contractInfo.contractAddress
          const saleToks = getDecodedFromCall(await marketContract.method(findMethodABI(contractABI, 'getSaleTokens')).call(nftAddr))
          await Promise.all(saleToks.map(async tokenIndex => {
            const auctionRes = await marketContract.method(findMethodABI(contractABI, 'getAuction')).call(nftAddr, tokenIndex)
            if (auctionRes.decoded.seller === address) {
              const tokenURI = getDecodedFromCall(await marketContract.method(findMethodABI(contractABI, 'tokenURI')).call(nftAddr, tokenIndex))
              const mdata = await getItemByIndex(tokenIndex, nftAddr, contractInfo.name, _category, saleToks, contractABI, marketContract)
              let groupImage, image = mdata.data.image
              if (contractInfo.category === 'Collection') {
                groupImage = contractInfo.symbolImg
              }
              else {
                groupImage = `/assets/images/collections/${toLowercase(contractInfo.name)}.jpg`
              }
              if (contractInfo.prettyUrl) {
                image = tokenURI + '.png'
              }
              const dur = parseInt(auctionRes.decoded[3]), start = parseInt(auctionRes.decoded[4])
              if (dur > 0 && new Date((start + dur) * 1000).getTime() > new Date().getTime()) {
                const getCurrentPriceABI = findMethodABI(marketplaceABI, 'getCurrentPrice')
                const getCurrentPriceMethod = connex.thor.account(marketplaceContractAddr).method(getCurrentPriceABI)
                const price = (await getCurrentPriceMethod.call(nftAddr, tokenIndex)).decoded[0]
                temp.push({ ...mdata.data, contract: nftAddr, tokenId: tokenIndex, price, group: contractInfo.name, groupImage: groupImage, endAt: new Date((start + dur) * 1000).getTime(), image })
              } else {
                temp.push({ ...mdata.data, contract: nftAddr, tokenId: tokenIndex, group: contractInfo.name, groupImage, image })
              }
              setMetadata([...temp])
            }
            /*
            const mdata = await getItemByIndex(tokenInd, nftAddr, contractInfo.name, _category, saleToks, contractABI, marketContract)
            if (mdata !== null) {
              //if (mdata !== null && (_title !== 'sale' || saleToks.includes(tokenInd))) {
              temp.push(mdata.data)
              setMetadata([...temp])
            }1
            */
          }))
        }
      }))
    }


    // if (_title === 'sale') temp = temp.filter(res => { return res.price > 0 })
    // if (_subCategory !== 'All Categories') temp = temp.filter(res => { return res.name === _subCategory })
    // return temp
  }

  const onBannerChanged = e => {
    const file = e.target.files[0]
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = e => setBanner(reader.result)
  }

  const onSubmit = async () => {
    setEditing(false)
    const res = await agent.user.addUser(userInfo, address)
    const newInfo = res.data
    dispatch(updateProfile(newInfo))
  }

  const onChangeEdit = edt => {
    setEditing(edt)
    if (edt) {
      setUserInfo({
        name: currentUser ? (currentUser.name ? currentUser.name : '') : '',
        country: currentUser ? (currentUser.country ? currentUser.country : '') : '',
        specialize: currentUser ? (currentUser.specialize ? currentUser.specialize : '') : '',
        birthday: currentUser ? (currentUser.birthday ? currentUser.birthday : '') : '',
        address: currentUser ? (currentUser.addr ? currentUser.addr : '') : '',
        wallet: currentUser ? (currentUser.address ? currentUser.address : '') : '',
        about: currentUser ? (currentUser.about ? currentUser.about : '') : '',
        photo: currentUser ? (currentUser.photo ? currentUser.photo : '') : '',
      })
    }
  }

  const onChangePhoto = e => {
    const file = e.target.files[0]
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async e => {
      const info = {
        name: currentUser ? (currentUser.name ? currentUser.name : '') : '',
        country: currentUser ? (currentUser.country ? currentUser.country : '') : '',
        specialize: currentUser ? (currentUser.specialize ? currentUser.specialize : '') : '',
        birthday: currentUser ? (currentUser.birthday ? currentUser.birthday : '') : '',
        address: currentUser ? (currentUser.addr ? currentUser.addr : '') : '',
        wallet: currentUser ? (currentUser.address ? currentUser.address : '') : '',
        about: currentUser ? (currentUser.about ? currentUser.about : '') : '',
        photo: reader.result
      }
      const res = await agent.user.addUser(info, address)
      const newInfo = res.data
      dispatch(updateProfile(newInfo))
    }
  }

  const onCancel = () => {
    setEditing(false)
    const info = {
      name: currentUser ? (currentUser.name ? currentUser.name : '') : '',
      country: currentUser ? (currentUser.country ? currentUser.country : '') : '',
      specialize: currentUser ? (currentUser.specialize ? currentUser.specialize : '') : '',
      birthday: currentUser ? (currentUser.birthday ? currentUser.birthday : '') : '',
      address: currentUser ? (currentUser.addr ? currentUser.addr : '') : '',
      wallet: currentUser ? (currentUser.wallet ? currentUser.wallet : '') : '',
      about: currentUser ? (currentUser.about ? currentUser.about : '') : '',
      photo: currentUser ? (currentUser.photo ? currentUser.photo : '') : '',
    }
    setUserInfo(info)
  }

  return <Fragment>
    <Banner title='Your VNFTs' subtitle='VeThugs Official' />
    <AuthorComponent
      address={address}
      name={name}
      description={description}
      data={data}
      type={type}
      currency={currency}
      price={price}
      royalty={royalty}
      size={size}
      copy={copy}
      category={category}
      title={title}
      group={group}
      banner={banner}
      metadata={metadata}
      subCategory={subCategory}
      editing={editing}
      userInfo={userInfo}
      copies={copies}
      setName={setName}
      setRoyalty={setRoyalty}
      setSize={setSize}
      setCopy={setCopy}
      setCategory={setCategory}
      setDescription={setDescription}
      setUserInfo={setUserInfo}
      onBannerChanged={onBannerChanged}
      setTitle={setTitle}
      setGroup={setGroup}
      setPrice={setPrice}
      setEditing={onChangeEdit}
      setCurrentSelCat={setCurrentSelCat}
      setCopies={setCopies}
      onFileChanged={onFileChanged}
      onChangePhoto={onChangePhoto}
      onSubmit={onSubmit}
      onCancel={onCancel}
      create={create} />
  </Fragment>
}
export default Author