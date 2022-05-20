import { Link } from 'react-router-dom'

const NFTItem = ({ group, bidderImgs, winnerImg, winnerName, nftImg, nftName, price, love, contract, tokenId, groupImage }) => <div className='nft-item full-height'>
  <div className='nft-inner full-height' style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginTop: 15 }}>
    <div className='collection-type' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {/* <div style={{ width: '35px', height: '35px', background: groupImage, backgroundSize: 'cover' }}></div> */}
      <img src={groupImage} style={{ height: '35px', width: '35px', marginRight: '10px', borderRadius: '17.5px' }} alt='not found' />
      {group}
    </div>
    {/* <div className='nft-item-top d-flex justify-content-between align-items-center fixed-size'>
      <div className='author-part'>
        <ul className='author-list d-flex'>
          {
            bidderImgs.map((bidderImg, index) => <li className='single-author' key={index}>
              <Link to='/author/123'><img loading='lazy'
                src={bidderImg} alt='author-img' /></Link>
            </li>)
          }
          <li className='single-author d-flex align-items-center'>
            <Link to='/author/123' className='veryfied'><img loading='lazy'
              src={winnerImg} alt='author-img' /></Link>
            <h6><Link to='/author/123'>{winnerName}</Link></h6>
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
    </div> */}
    <div className='nft-item-bottom stretch-size' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div />
      <div className='nft-thumb'>
        <img loading='lazy' src={nftImg} alt='NFT IMAGE' />
      </div>
      <div className='nft-content'>
        <h4><Link to={`/explore/${contract}/${tokenId}`}>{nftName}</Link> </h4>
        {
          !!price && <div className='price-like d-flex justify-content-between align-items-center'>
            <p className='nft-price'>Price: <span className='yellow-color'>{price}</span>
            </p>
          </div>
        }
      </div>
    </div>
  </div>
</div>

export default NFTItem