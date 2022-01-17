import { Link } from 'react-router-dom'

const Logo = () => <div className='header__logo'>
  <Link to='/'>
    <img src='/assets/images/logo/logo.png' alt='logo' />
  </Link>
</div>

export default Logo