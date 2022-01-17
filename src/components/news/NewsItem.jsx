import { Link } from 'react-router-dom'

const NewsItem = ({ title, date, author, image }) => <div className='nft-item blog-item'>
  <div className='nft-inner'>
    <div className='nft-thumb'>
      <img src={image} alt='blog-img' />
    </div>
    <div className='nft-content'>
      <div className='author-details'>
        <h4><Link to='/news/123'>{title}</Link> </h4>
        <div className='meta-info'>
          <p className='date'><span><i
            className='icofont-ui-calendar'></i></span>{date}
          </p>
          <p><span><i className='icofont-user'></i></span>{author}</p>
        </div>
      </div>
    </div>
  </div>
</div>

export default NewsItem