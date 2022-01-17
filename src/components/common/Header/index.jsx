import { Link } from 'react-router-dom'
import Logo from './Logo'
import Menu from './Menu'

const Header = ({ address, disconnect }) => <header className='header style-2'>
  <div className='container-fluid'>
    <div className='header__content'>
      <Logo />
      {/* <Searchbox /> */}
      <Menu address={address} />
      <div className='header__actions'>
        <div className='header__action header__action--search'>
          <button className='header__action-btn' type='button'><i className='icofont-search-1'></i></button>
        </div>
        {
          address ? <div className='header__action header__action--profile' style={{ border: 'none' }}>
            <div className='dropdown'>
              <a className='dropdown-toggle' role='button' data-bs-toggle='dropdown'
                aria-expanded='false' data-bs-offset='-100,10' href='replace'>
                <span data-blast='bgColor'><i className='icofont-user'></i></span> <span
                  className='d-none d-md-inline'>{(address.substr(0, 6) + '...' + address.substr(address.length - 4, 4))}</span>
              </a>
              <ul className='dropdown-menu'>
                <li><button className='dropdown-item' onClick={e => disconnect()}> Disconnect <span className='ms-1'><i className='icofont-logout'></i></span></button></li>
              </ul>
            </div>
          </div> : <div className='wallet-btn'>
            <Link to='/wallet'><span><i className='icofont-wallet' data-blast='color'></i></span> <span
              className='d-none d-md-inline'>Connect Wallet</span> </Link>
          </div>
        }
      </div>
      <button className='menu-trigger header__btn' id='menu05'>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</header>

export default Header