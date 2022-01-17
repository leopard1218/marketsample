import { Link } from 'react-router-dom'

const PopularPosts = ({ posts }) => <div className='widget widget-post'>
  <div className='widget-header'>
    <h5 className='title'>Most Popular Post</h5>
  </div>
  <ul className='widget-wrapper'>
    {
      posts.map(post => <li className='d-flex flex-wrap justify-content-between'>
        <div className='post-thumb'>
          <Link to='/news/123'><img src={post.image}
            alt='post-img' /></Link>
        </div>
        <div className='post-content'>
          <Link to='/news/123'>
            <h6>{post.title}</h6>
          </Link>
          <p>{post.date}</p>
        </div>
      </li>)
    }
  </ul>
</div>

export default PopularPosts