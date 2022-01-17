import { Fragment } from 'react'

import Banner from '../../components/common/Banner'
import VeThugsNewsComponent from '../../components/news/VeThugsNews'

const VeThugsNews = () => {
  return <Fragment>
    <Banner title='VeThugs News' subtitle='VeThugs News' />
    <VeThugsNewsComponent />
  </Fragment>
}

export default VeThugsNews