import { Fragment } from 'react'
import BigNumber from 'bignumber.js'

import NFTItem from './NFTItem'
import AuctionItem from '../Auctions/AuctionItem'
import Select from '../../common/Select'
// import SearchSmall from '../../common/SearchSmall'
// import LoadMore from '../../common/LoadMore'

const ExploreAll = ({ metadata, category, collections, collection, sortOption, saleTokens, setCategory, setCollection, setSortOption }) => <Fragment>
  <section className='explore-section padding-top padding-bottom'>
    <div className='container-xl container-lg container-md container-sm'>
      <div className='section-header'>
        <div className='nft-filter d-flex flex-wrap align-items-center justify-content-center  gap-15'>
          <h3><i className='icofont-network-tower theme-color'></i> Live Sales</h3>
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
              saleTokens.length === 0 ? <h2 style={{ margin: 'auto', textAlign: 'center' }}>No NFTs on Sale<br />Please Sell your NFT</h2> : metadata.map(collection => collection.map(nft => {
                console.log("mapping:", nft.groupImage)
                return <div className='col-xl-3 col-lg-4 col-sm-6' key={nft.tokenId}>
                  {
                    !!nft.endAt ? <AuctionItem group={nft.group} groupImage={nft.groupImage} bidderImgs={['/assets/images/seller/05.png']} winnerImg='/assets/images/seller/05.gif' winnerName='' nftName={nft.name} love={278} nftImg={nft.image} contract={nft.contract} tokenId={nft.tokenId} endAt={nft.endAt} price={`${BigNumber(nft.price).dividedBy(BigNumber('1000000000000000000')).toFixed(3)} VET`} /> : <NFTItem group={nft.group} groupImage={nft.groupImage} bidderImgs={['/assets/images/seller/05.png']} winnerImg='/assets/images/seller/05.gif' winnerName='' nftName={nft.name} love={278} nftImg={nft.image} contract={nft.contract} tokenId={nft.tokenId} price={`${BigNumber(nft.price).dividedBy(BigNumber('1000000000000000000')).toFixed(3)} VET`} />
                  }
                </div>
              }))
            }
          </div>
          {/* <LoadMore /> */}
        </div>
      </div>
    </div>
  </section>
</Fragment>

export default ExploreAll