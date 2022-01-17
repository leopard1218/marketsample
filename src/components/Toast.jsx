import { Link } from 'react-router-dom'

const MyToast = ({ title, content }) =>
  <div className='activity-item' style={{ position: 'fixed', top: '100px', right: '10px', width: '400px', height: 'auto' }}>
    <div className='lab-inner d-flex flex-wrap align-items-center p-2 p-md-4'>
      <div style={{ width: '100%' }}>
        <h4><Link to='/explore/123'>{title}</Link></h4>
        <p className='mt-2 mb-2'>{content}</p>
      </div>
    </div>
  </div>

export default MyToast