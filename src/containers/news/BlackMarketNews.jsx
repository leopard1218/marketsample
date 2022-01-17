import { Fragment } from 'react'

import Banner from '../../components/common/Banner'
import BlackMarketNewsComponent from '../../components/news/BlackMarketNews'

const BlackMarketNews = () => {
  return <Fragment>
    <Banner title='BlackVeMarket News' subtitle='BlackVeMarket News' />
    <BlackMarketNewsComponent />
  </Fragment>
}

export default BlackMarketNews