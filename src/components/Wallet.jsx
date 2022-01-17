import { Link } from 'react-router-dom'

const Wallet = ({ connectWallet }) => <section className='wallet-section padding-top padding-bottom'>
  <div className='container-xl container-lg container-md container-sm'>
    <div className='wallet-inner'>
      <div className='row g-3' style={{ justifyContent: 'center' }}>
        <div className='col-lg-4 col-md-6' onClick={e => connectWallet()}>
          <div className='wallet-item'>
            <div className='wallet-item-inner'>
              <div className='wallet-thumb'>
                <img src='assets/images/wallet/Sync2.jpg' alt='wallet-img' />
                <img className='ml-3' src='assets/images/wallet/VeThor.png' alt='wallet-img' style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
              </div>
              <div className='wallet-content'>
                <h5><Link to='/signin'>Sync2 Wallet</Link></h5>
                <p>Connect with your Sync 2 or VeChainThor mobile wallet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row' style={{ justifyContent: 'center' }}>
        <p className='mt-5 mb-0 wallet-notice'><span className='me-1 theme-color'><i
          className='icofont-bulb-alt'></i></span> We
          do not own your private keys and cannot access your funds.</p>
      </div>
    </div>
  </div>
</section>

export default Wallet