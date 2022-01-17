import MarketDropItem from './MarketDropItem'

const MarketDrops = () => <section className='ex-drop-section padding-bottom'>
  <div className='container-xl container-lg container-md container-sm'>
    <div className='section-header style-2'>
      <div className='header-shape'><span></span></div>
      <h3>Exclusive BlackVeMarket Drops</h3>
    </div>
    <div className='section-wrapper'>
      <div className='ex-drop-wrapper'>
        <div className='row justify-content-center gx-4 gy-3'>
          <div className='col-xl-3 col-lg-4 col-sm-6'>
            <MarketDropItem author='Gucci Lucas' authorImgs={[]} authorImg='/assets/images/seller/04.png' nftName='EUPHORIA de' price='0.34 ETH' love={230} nftImg='/assets/images/nft-item/01.gif' />
          </div>
          <div className='col-xl-3 col-lg-4 col-sm-6'>
            <MarketDropItem author='Ecalo jers' authorImgs={['/assets/images/seller/01.png', '/assets/images/seller/01.gif']} authorImg='/assets/images/seller/02.png' nftName='Mewao com de' price='0.34 ETH' love={278} nftImg='/assets/images/nft-item/02.jpg' />
          </div>
          <div className='col-xl-3 col-lg-4 col-sm-6'>
            <MarketDropItem author='Hola moc' authorImgs={['/assets/images/seller/02.png', '/assets/images/seller/05.png']} authorImg='/assets/images/seller/04.png' nftName='pet mice rio' price='0.34 ETH' love={340} nftImg='/assets/images/nft-item/03.jpg' />
          </div>
          <div className='col-xl-3 col-lg-4 col-sm-6'>
            <MarketDropItem author='Logicto pen' authorImgs={['/assets/images/seller/06.png']} authorImg='/assets/images/seller/05.gif' nftName='Logical Impact' price='0.34 ETH' love={330} nftImg='/assets/images/nft-item/06.gif' />
          </div>
          <div className='col-xl-3 col-lg-4 col-sm-6'>
            <MarketDropItem author='Logicto pen' authorImgs={['/assets/images/seller/06.png', '/assets/images/seller/07.gif']} authorImg='/assets/images/seller/09.png' nftName='Fly on high' price='0.34 ETH' love={355} nftImg='/assets/images/nft-item/09.jpg' />
          </div>
          <div className='col-xl-3 col-lg-4 col-sm-6'>
            <MarketDropItem author='Monica bel' authorImgs={[]} authorImg='/assets/images/seller/05.gif' nftName='kiara rodri de' price='0.34 ETH' love={60} nftImg='/assets/images/nft-item/06.jpg' />
          </div>
          <div className='col-xl-3 col-lg-4 col-sm-6'>
            <MarketDropItem author='Gucci L.' authorImgs={['/assets/images/seller/08.gif', '/assets/images/seller/01.png']} authorImg='/assets/images/seller/11.png' nftName='EUPHORIA de' price='0.34 ETH' love={230} nftImg='/assets/images/nft-item/04.gif' />
          </div>
          <div className='col-xl-3 col-lg-4 col-sm-6'>
            <MarketDropItem author='ptrax elm.' authorImgs={['/assets/images/seller/01.png', '/assets/images/seller/07.png']} authorImg='/assets/images/seller/09.png' nftName='Homies wall' price='0.34 ETH' love={930} nftImg='/assets/images/nft-item/08.jpg' />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

export default MarketDrops