import { Link } from 'react-router-dom'

const Menu = ({ address }) => <div className='header__menu ms-auto'>
  <ul className='header__nav mb-0'>
    <li className='header__nav-item'>
      <Link className='header__nav-link active' to='/'>Home</Link>
    </li>
    <li className='header__nav-item'>
      <a className='header__nav-link' role='button' data-bs-toggle='dropdown'
        aria-haspopup='true' aria-expanded='false' data-bs-offset='0,10' href='replace'>Explore</a>
      <ul className='dropdown-menu header__nav-menu' data-popper-placement='top-start'>
        <li><Link className='drop-down-item' to='/explore/all'>Live Sales</Link></li>
        <li><Link className='drop-down-item' to='/explore/auctions'>Live Auctions</Link></li>
      </ul>
    </li>
    {/* <li className='header__nav-item'>
      <Link to='/activity' className='header__nav-link'>Activity</Link>
    </li> */}

    {/* <li className='header__nav-item'>
      <a className='header__nav-link' role='button' data-bs-toggle='dropdown'
        aria-haspopup='true' aria-expanded='false' data-bs-offset='0,10' href='replace'>News</a>
      <ul className='dropdown-menu header__nav-menu'>
        <li><a className='drop-down-item' href='/news/market'>BlackVeMarket news</a></li>
        <li><a className='drop-down-item' href='/news/vethugs'>VeThugs news</a></li>
      </ul>
    </li> */}

    <li className='header__nav-item'>
      <a href='https://airtable.com/shrWl1rhp4cvVwSlH' target="_blank" rel="noreferrer" className='header__nav-link'>Apply</a>
    </li>


    <li className='header__nav-item'>
      <Link className='header__nav-link' to='/author/123'>My Items</Link>
    </li>
  </ul>
</div>

export default Menu