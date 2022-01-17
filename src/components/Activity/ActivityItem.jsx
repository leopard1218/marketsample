import { Link } from 'react-router-dom'

const ActivityItem = ({ title, description, price, by, at, image }) => <div className='activity-item'>
  <div className='lab-inner d-flex flex-wrap align-items-center p-3 p-md-4'>
    <div className='lab-thumb me-3 me-md-4'>
      <img src={image} alt='img' />
    </div>
    <div className='lab-content'>
      <h4><Link to='/explore/123'>{title}</Link>
      </h4>
      <p className='mb-2'>{description}
        <b>{price}</b>
      </p>
      <p className='user-id'>By: <Link to='/author'>{by}</Link></p>
      <p>At: {at}</p>
    </div>
  </div>
</div>

export default ActivityItem