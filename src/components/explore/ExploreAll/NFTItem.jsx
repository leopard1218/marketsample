import { Link } from 'react-router-dom'

const NFTItem = ({ group, nftImg, nftName, price, contract, tokenId, groupImage }) => <div className='nft-item full-height'>
  <div className='nft-inner full-height' style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginTop: 15 }}>
    <div className='collection-type' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <img src={groupImage} style={{ height: '35px', width: '35px', marginRight: '10px', borderRadius: '17.5px' }} alt='not found' />
      {group}
    </div>
    <div className='nft-item-bottom stretch-size' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div />
      <div className='nft-thumb'>
        <img loading='lazy' src={nftImg} alt='not found' />
      </div>
      <div className='nft-content'>
        <h4><Link to={`/explore/${contract}/${tokenId}`}>{nftName}</Link> </h4>
        {
          !!price && <div className='price-like d-flex justify-content-between align-items-center'>
            <p className='nft-price'>Price: <span className='yellow-color'>{price}</span>
            </p>
          </div>
        }
      </div>
    </div>
  </div>
</div>

export default NFTItem