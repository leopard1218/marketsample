import { Link } from 'react-router-dom'

const PopularArtistItem = ({ nftImg, artistImg, ranking, name, price, link }) => <div className='col-xl-3 col-lg-4 col-sm-6'>
  <div className='nft-item home-2 style-2'>
    <div className='nft-inner'>
      <div className='nft-thumb'>
        <img src={nftImg} alt='nft-img' />
      </div>
      <div className='nft-content'>
        <div className='author-thumb'>
          <Link to={link} className='veryfied'><img
            src={artistImg} alt='author-img' /></Link>
        </div>
        <div className='author-details d-flex flex-wrap align-items-center gap-15' style={{ flexDirection: 'row' }}>
          <div className='author-number'>
            <h3 className='fs-36'>{ranking}</h3>
          </div>
          <div className='author-det-info' style={{ flexGrow: 1 }}>
            <h5><Link to={link}>{name}</Link> </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

export default PopularArtistItem