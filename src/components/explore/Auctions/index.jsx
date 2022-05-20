import { Fragment } from 'react'
import BigNumber from 'bignumber.js'

import Select from '../../common/Select'
// import LoadMore from '../../common/LoadMore'
// import SearchSmall from '../../common/SearchSmall'
import AuctionItem from './AuctionItem'

const Auctions = ({ metadata, category, collections, collection, sortOption, loaded, setCategory, setCollection, setSortOption }) => <Fragment>
  <section className='explore-section padding-top padding-bottom'>
    <div className='container-xl container-lg container-md container-sm'>
      <div className='section-header'>
        <div className='nft-filter d-flex flex-wrap align-items-center justify-content-center  gap-15'>
          <h3><i className='icofont-network-tower theme-color'></i> Live Auctions</h3>
          <Select label='Select a Category' value={category} onChange={e => setCategory(e.target.value)} options={[{
            value: 'created',
            label: 'Created'
          }, {
            value: 'collections',
            label: 'Collections'
          }]} />
          <Select label='Select a Collection' value={collection} onChange={e => setCollection(e.target.value)} options={collections} />
          {/* <Select label='Sort By' value={sortOption} onChange={e => setSortOption(e.target.values)} options={[{
            value: 'newest',
            label: 'Newest'
          }, {
            value: 'oldest',
            label: 'Oldest'
          }, {
            value: 'high price',
            label: 'High Price'
          }, {
            value: 'low price',
            label: 'Low Price'
          }]} /> */}
        </div>
        {/* <SearchSmall label='NFT' /> */}
      </div>
      <div className='section-wrapper'>
        <div className='explore-wrapper'>
          <div className='row justify-content-center gx-4 gy-3'>
            {
              metadata.length > 0 ? metadata.map(collection => collection.map(nft => <div className='col-xl-3 col-lg-4 col-sm-6' key={nft.tokenId}>
                <AuctionItem bidderImgs={[]} winnerImg='/assets/images/seller/04.png' winnerName='Gucci Lucas' nftName={nft.name} price={`${BigNumber(nft.price).dividedBy(BigNumber('1000000000000000000')).toFixed(3)} VET`} love={230} nftImg={nft.image} contract={nft.contract} tokenId={nft.tokenId} group={nft.group} groupImage={nft.groupImage} endAt={nft.endAt} />
              </div>)) : <h2 style={{ margin: 'auto', textAlign: 'center' }}>No NFTs on Auction<br />Please place your NFT on Auction</h2>
            }
            {/* <div className='col-xl-3 col-lg-4 col-sm-6'>
              <AuctionItem bidderImgs={[]} winnerImg='/assets/images/seller/04.png' winnerName='Gucci Lucas' nftImg='/assets/images/nft-item/02.gif' nftName='EUPHORIA de' price={0.34} love={230} />
            </div>
            <div className='col-xl-3 col-lg-4 col-sm-6'>
              <AuctionItem bidderImgs={['/assets/images/seller/01.png', '/assets/images/seller/01.gif']} winnerImg='/assets/images/seller/02.png' winnerName='Ecalo jers' nftImg='/assets/images/nft-item/05.jpg' nftName='Mewao com de' price={0.34} love={278} />
            </div>
            <div className='col-xl-3 col-lg-4 col-sm-6'>
              <AuctionItem bidderImgs={['/assets/images/seller/02.png', '/assets/images/seller/05.png']} winnerImg='/assets/images/seller/04.png' winnerName='Hola moc' nftImg='/assets/images/nft-item/01.jpg' nftName='pet mice rio' price={0.34} love={340} />
            </div>
            <div className='col-xl-3 col-lg-4 col-sm-6'>
              <AuctionItem bidderImgs={['/assets/images/seller/06.png']} winnerImg='/assets/images/seller/05.gif' winnerName='Logicto pen' nftImg='/assets/images/nft-item/03.gif' nftName='Logical Impact' price={0.34} love={330} />
            </div>
            <div className='col-xl-3 col-lg-4 col-sm-6'>
              <AuctionItem bidderImgs={['/assets/images/seller/06.png', '/assets/images/seller/07.gif']} winnerImg='/assets/images/seller/09.png' winnerName='unique lo' nftImg='/assets/images/nft-item/03.jpg' nftName='Fly on high' price={0.34} love={355} />
            </div>
            <div className='col-xl-3 col-lg-4 col-sm-6'>
              <AuctionItem bidderImgs={[]} winnerImg='/assets/images/seller/05.gif' winnerName='Monica bel' nftImg='/assets/images/nft-item/06.gif' nftName='kiara rodri de' price={0.34} love={60} />
            </div>
            <div className='col-xl-3 col-lg-4 col-sm-6'>
              <AuctionItem bidderImgs={['/assets/images/seller/08.gif', '/assets/images/seller/01.png']} winnerImg='/assets/images/seller/11.png' winnerName='Gucci L.' nftImg='/assets/images/nft-item/04.jpg' nftName='EUPHORIA de' price={0.34} love={230} />
            </div>
            <div className='col-xl-3 col-lg-4 col-sm-6'>
              <AuctionItem bidderImgs={['/assets/images/seller/01.png', '/assets/images/seller/07.png']} winnerImg='/assets/images/seller/09.png' winnerName='Homies wall' nftImg='/assets/images/nft-item/07.jpg' nftName='EUPHORIA de' price={0.34} love={930} />
            </div>
            <div className='col-xl-3 col-lg-4 col-sm-6'>
              <AuctionItem bidderImgs={['/assets/images/seller/06.png']} winnerImg='/assets/images/seller/05.gif' winnerName='Logicto pen' nftImg='/assets/images/nft-item/08.jpg' nftName='Logical Impact' price={0.34} love={330} />
            </div>
            <div className='col-xl-3 col-lg-4 col-sm-6'>
              <AuctionItem bidderImgs={['/assets/images/seller/02.png', '/assets/images/seller/05.png']} winnerImg='/assets/images/seller/04.png' winnerName='Hola moc' nftImg='/assets/images/nft-item/05.gif' nftName='pet mice rio' price={0.34} love={340} />
            </div>
            <div className='col-xl-3 col-lg-4 col-sm-6'>
              <AuctionItem bidderImgs={['/assets/images/seller/01.png', '/assets/images/seller/01.gif']} winnerImg='/assets/images/seller/02.png' winnerName='Mewao com de' nftImg='/assets/images/nft-item/09.jpg' nftName='pet mice rio' price={0.34} love={278} />
            </div>
            <div className='col-xl-3 col-lg-4 col-sm-6'>
              <AuctionItem bidderImgs={[]} winnerImg='/assets/images/seller/04.png' winnerName='Gucci Lucas' nftImg='/assets/images/nft-item/04.gif' nftName='EUPHORIA de' price={0.34} love={230} />
            </div> */}
          </div>
          {/* <LoadMore /> */}
        </div>
      </div>
    </div>
  </section>
</Fragment>

export default Auctions