import cx from 'classnames'
import { Link } from 'react-router-dom'

const Follower = ({ number, name, money, image, following }) => <div className='seller-item'>
  <div className='seller-inner'>
    <div className='seller-part'>
      <p className='assets-number' style={{ width: '25px', textAlign: 'center' }}>{number}</p>
      <div className='assets-owner'>
        <div className='owner-thumb veryfied'>
          <Link to='/author'><img
            src={image}
            alt='seller-img' /></Link>
        </div>
        <div className='owner-content'>
          <h5><Link to='/author'>{name}</Link>
          </h5>
          <p>${money}</p>
        </div>
      </div>
    </div>
    <div className={cx('follow-part', { 'activefollow': following })}>
      <button className='btn-follow follow-state'>
        <span className='follow'><i
          className='fa fa-user-plus'></i>
          Follow</span>
        <span className='unfollow'>Unfollow</span>
        <span className='following'>Following</span>
      </button>
    </div>
  </div>
</div>

export default Follower