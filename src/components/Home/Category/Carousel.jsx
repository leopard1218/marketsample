import { Link } from 'react-router-dom'

const Carousel = ({ images, title, link }) => <div className='nft-item home-2 cat-item'>
  <div className='nft-inner'>
    <div className='nft-cat-thumb '>
      {/* <div className='thumb-list swiper-wrapper'>
        {
          images.map((img, index) => <div className='swiper-slide' key={index} style={{ width: '100%' }}>
            <div className='single-thumb'><img
              src={img} alt='cat-img' />
            </div>
          </div>)
        }
      </div> */}
      <div style={{ width: '100%' }}>
        <img src={images[0]} alt='not found'/>
      </div>
    </div>
    <div className='nft-content'>
      <div className='author-details'>
        <h4><Link to={link}>{title}</Link> </h4>
      </div>
    </div>
  </div>
</div>

export default Carousel