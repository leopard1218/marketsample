import { useSelector } from 'react-redux'

import PreloaderComponent from '../components/Preloader'

const Preloader = () => {
  const common = useSelector(state => state.common)
  const { loading } = common
  return loading && <PreloaderComponent />
}

export default Preloader