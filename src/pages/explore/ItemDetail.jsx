import { useParams } from 'react-router-dom'

import ItemDetailContainer from '../../containers/explore/ItemDetail'

const ItemDetail = () => {
  const { contract, tokenId } = useParams()
  return <ItemDetailContainer contract={contract} tokenId={tokenId} />
}

export default ItemDetail