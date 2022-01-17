import { Fragment, useState } from 'react'

import Banner from '../components/common/Banner'
import ActivityComponent from '../components/Activity/'

const Activity = () => {
  const [sortOption, setSortOption] = useState('newest')
  const [filter, setFilter] = useState([
    {
      label: 'Listing',
      active: false,
      icon: 'icofont-listine-dots'
    }, {
      label: 'Purchases',
      active: true,
      icon: 'icofont-cart'
    }, {
      label: 'Sales',
      active: false,
      icon: 'icofont-sale-discount'
    }
  ])
  const onChangeFilter = index => {
    let newFilter = filter
    newFilter[index].active = !newFilter[index].active
    setFilter([...newFilter])
  }
  return <Fragment>
    <Banner title='Activities' subtitle='Activites' />
    <ActivityComponent sortOption={sortOption} filter={filter} setSortOption={setSortOption} onChangeFilter={onChangeFilter} />
  </Fragment>
}

export default Activity