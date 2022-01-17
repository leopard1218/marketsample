import { Link } from 'react-router-dom'

const Banner = ({ address }) => <section className='banner-section style-2' style={{ backgroundImage: 'url(/assets/images/banner/bg.jpg)' }}>
  <div className='container'>
    <div className='banner-wrapper'>
      <div className='row align-items-center justify-content-center'>
        <div className='col-lg-8'>
          <div className='banner-content text-center'>
            <h1><span>Discover</span> Collect <br />
              And Sell Extraordinary <span>VNFTs</span></h1>
            <p>Digital Marketplace For VNFT Collectibles.
              Buy, Sell, And Discover Exclusive Digital Assets.</p>
            <div className='banner-btns d-flex flex-wrap justify-content-center'>
              <Link to='/explore/all' className='default-btn home-2 move-top'
                data-blast='bgColor'><span>Explore</span> </Link>
              <Link to={address ? '/author' : '/wallet'} className='default-btn home-2 move-right'><span>Sell</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

export default Banner