import MarketNewsItem from './MarketNewsItem'

const BlackVeMarketNews = () => <section className='blog-section pb-120'>
  <div className='container-xl container-lg container-md container-sm'>
    <div className='section-header style-2'>
      <div className='header-shape'><span></span></div>
      <h3>BlackVeMarket NEWS</h3>
    </div>
    <div className='section-wrapper'>
      <div className='blog-wrapper'>
        <div className='row justify-content-center gx-4 gy-2'>
          <div className='col-lg-4 col-sm-6'>
            <MarketNewsItem title='The Rise of the Non Fungible Tokens on VeChain (VIP181)' date='November 27 2021' author='Murtagh300' image='/assets/images/nft-item/blog/1.png' />
          </div>
          <div className='col-lg-4 col-sm-6'>
            <MarketNewsItem title='Top 5 Most Popular VNFT Games in 2021' date='November 27 2021' author='Rassel H.' image='/assets/images/nft-item/blog/Airworthy.png' />
          </div>
          <div className='col-lg-4 col-sm-6'>
            <MarketNewsItem title='The counterpart of VeThugs meet the VeShawties' date='July 20 2021' author='Alex zym' image='/assets/images/nft-item/blog/Airworthy.png' />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

export default BlackVeMarketNews