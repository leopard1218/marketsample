import { Link } from 'react-router-dom'

const MarketDropItem = ({ author, authorImgs, authorImg, nftName, nftImg, price, love }) => <div className='nft-item home-2'>
  <div className='nft-inner'>
    <div className='nft-item-top d-flex justify-content-between align-items-center'>
      <div className='author-part'>
        <ul className='author-list d-flex'>
          {
            authorImgs.map((athImg, index) => <li className='single-author' key={index}>
              <Link to='/author'><img loading='lazy'
                src={athImg} alt='author-img' /></Link>
            </li>)
          }
          <li className='single-author d-flex align-items-center'>
            <Link to='/author' className='veryfied'><img loading='lazy'
              src={authorImg} alt='author-img' /></Link>
            <h6><Link to='/author'>{author}</Link></h6>
          </li>
        </ul>
      </div>
      <div className='more-part'>
        <div className=' dropstart'>
          <a className=' dropdown-toggle' href='replace' role='button'
            data-bs-toggle='dropdown' aria-expanded='false'
            data-bs-offset='25,0'>
            <i className='icofont-flikr'></i>
          </a>
          <ul className='dropdown-menu'>
            <li><a className='dropdown-item' href='replace'><span>
              <i className='icofont-warning'></i>
            </span> Report </a>
            </li>
            <li><a className='dropdown-item' href='replace'><span><i
              className='icofont-reply'></i></span> Share</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className='nft-item-bottom'>
      <div className='nft-thumb'>
        <img loading='lazy' src={nftImg} alt='nft-img' />
      </div>
      <div className='nft-content'>
        <h4><Link to='/explore/123'>{nftName}</Link> </h4>
        <div className='price-like d-flex justify-content-between align-items-center'>
          <p className='nft-price'>Price: <span className='yellow-color'>{price}</span>
          </p>
          <a href='replace' className='nft-like'><i className='icofont-heart'></i>
            {love}</a>
        </div>
      </div>
    </div>
  </div>
</div>

export default MarketDropItem