import { Fragment } from 'react'
import { useSelector } from 'react-redux'

import Banner from './Banner'
import Category from './Category/'
import PopularArtists from './PopularArtists/'
// import MarketDrops from './MarketDrops/'
// import BlackVeMarketNews from './BlackVeMarketNews/'

const Home = ({ collections }) => {
  const auth = useSelector(state => state.auth)

  return <Fragment>
    <Banner address={auth.address} />
    <Category />
    <PopularArtists collections={collections} />
    {/* <MarketDrops /> */}
    {/* <BlackVeMarketNews /> */}
  </Fragment>
}

export default Home