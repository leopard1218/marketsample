import { useState, useEffect } from 'react'

import HomeComponent from '../components/Home/'

import agent from '../api/'

const Home = () => {
  const [collections, setCollections] = useState([])
  useEffect(() => {
    const init = async () => {
      const res = await agent.contract.getContracts()
      setCollections([...(res.data.filter(col => col.category === 'Collection'))])
    }
    init()
  }, [])
  return <HomeComponent collections={collections} />
}

export default Home