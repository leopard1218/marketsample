import { Link } from 'react-router-dom'

const MarketNewsItem = ({ image, title, date, author }) => <div className='nft-item home-2 blog-item'>
  <div className='nft-inner'>
    <div className='nft-thumb'>
      <img src={image} alt='blog-img' />
    </div>
    <div className='nft-content'>
      <div className='author-details'>
        <h4><Link to='/news/123'>{title}</Link> </h4>
        <div className='meta-info'>
          <p><span><i className='icofont-ui-calendar'
            data-blast='color'></i></span>{date}
          </p>
          <p><span><i className='icofont-user'
            data-blast='color'></i></span>{author}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

export default MarketNewsItem