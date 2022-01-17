import { Link } from 'react-router-dom'
import Countdown from 'react-countdown'

const AuctionItem = ({ title, contract, tokenId, bidderImgs, winnerImg, winnerName, nftImg, nftName, price, love, group, groupImage, endAt }) => <div className='nft-item full-height'>
  <div className='nft-inner full-height' style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginTop: 15 }}>
    <div className='collection-type' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {/* <div style={{ width: '35px', height: '35px', background: groupImage, backgroundSize: 'cover' }}></div> */}
      <img src={groupImage} style={{ height: '35px', width: '35px', marginRight: '10px', borderRadius: '17.5px' }} alt='not found' />
      {group}
    </div>
    <div className='nft-item-bottom stretch-size' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div />
      <div className='nft-thumb'>
        <img src={nftImg} alt='nft-img' />
        <Countdown date={endAt} renderer={({ days, hours, minutes, seconds, completed }) => completed ? '' : <ul className='nft-countdown count-down' data-date='July 05, 2022 21:14:01'
          data-blast='bgColor'>
          {
            days > 0 && <li>
              <span className='days'>{days}</span><span className='count-txt'>D</span>
            </li>
          }
          {
            (days > 0 || hours > 0) && <li>
              <span className='hours'>{hours}</span><span className='count-txt'>H</span>
            </li>
          }
          {
            (days > 0 || hours > 0 || minutes > 0) && <li>
              <span className='minutes'>{minutes}</span><span className='count-txt'>M</span>
            </li>
          }
          {
            (days > 0 || hours > 0 || minutes > 0 || seconds > 0) && <li>
              <span className='seconds'>{seconds}</span><span className='count-txt'>S</span>
            </li>
          }
        </ul>} />
      </div>
      <div className='nft-content'>
        <h4><Link to={`/explore/${contract}/${tokenId}`}>{nftName}</Link> </h4>
        <div className='price-like d-flex justify-content-between align-items-center'>
          <p className='nft-price'>Price: <span className='yellow-color'>{price}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

export default AuctionItem