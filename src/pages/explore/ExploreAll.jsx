import { useParams } from 'react-router-dom'

import ExploreAllContainer from '../../containers/explore/ExploreAll'

const ExploreAll = () => {
  const { category, collection } = useParams()
  console.log('current params:',category,collection)
  return <ExploreAllContainer curCategory={category} curCollection={collection} />
}

export default ExploreAll