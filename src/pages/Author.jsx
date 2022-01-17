import { useParams } from 'react-router-dom'

import AuthorContainer from '../containers/Author'

const Author = () => {
  const { id } = useParams()
  return <AuthorContainer userWallet={id} />
}

export default Author