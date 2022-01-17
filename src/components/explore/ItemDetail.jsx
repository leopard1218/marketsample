import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Countdown from 'react-countdown'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import cx from 'classnames'
import { saveAs } from "file-saver"

import { toUppercase, useInterval } from '../../helpers/methods'

const ItemDetail = ({ metadata, contract, tokenId, seller, custom, creator, royalty, duration, price, collection, endAt, buy, currentUser, hasRoyalty, auction, to, stPrice, edPrice, address, auctionPrice, destination, download, createSale, transfer, onChangeAuction, onChangeTo, onChangeStPrice, onChangeEdPrice, onChangeAuctionPrice, onChangeDestination, removeSale }) => {
  const [tmp, setTmp] = useState(0)
  const [copied, setCopied] = useState(false)
  const [title, setTitle] = useState('first')
  useInterval(() => setTmp(tmp === 0 ? 1 : 0), 1000)
  const onCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return <div className='item-details-section padding-top padding-bottom'>
    <div className='container-xl container-lg container-md container-sm'>
      <div className='item-details-wrapper'>
        <div className='row g-5'>
          <div className='col-lg-6'>
            <div className='item-desc-part'>
              <div className='item-desc-inner'>
                <div className='item-desc-thumb'>
                  {
                    !!metadata && !!metadata.properties && metadata.properties.files[0].type.startsWith('video') && <video controls src={metadata.properties.files[0].uri} alt='no-content' style={{ width: '100%' }} controlsList="nodownload" className='mb-4' />
                  }
                  {
                    !!metadata && !!metadata.properties && metadata.properties.files[0].type.startsWith('audio') && <audio controls style={{ width: '100%' }} className='mb-4'>
                      <source src={metadata.properties.files[0].uri} />
                    </audio>
                  }
                  {
                    !!metadata && ((custom && !!metadata.properties && metadata.properties.files[0].type.startsWith('image')) || !custom) && <img src={metadata.image} alt='item-img' />
                  }
                </div>
                <div className='item-desc-content'>
                  <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                      <button className='nav-link active' id='nav-details-tab' data-bs-toggle='tab'
                        data-bs-target='#nav-details' type='button' role='tab'
                        aria-controls='nav-details'>Details</button>
                      {
                        !!metadata.attributes && metadata.attributes.length > 0 && <button className='nav-link' id='nav-attributes-tab' data-bs-toggle='tab'
                          data-bs-target='#nav-attributes' type='button' role='tab'
                          aria-controls='nav-attributes'>Attributes</button>
                      }
                    </div>
                  </nav>
                  <div className='tab-content' id='nav-tabContent'>
                    <div className='details-tab tab-pane fade show active' id='nav-details'
                      role='tabpanel' aria-labelledby='nav-details-tab'>
                      <p>{metadata.description}</p>
                      <div className='author-profile d-flex flex-wrap align-items-center gap-15'>
                        <div className='author-p-thumb'>
                          <Link to='/author'><img src='/assets/images/seller/02.gif'
                            alt='author-img ' /></Link>
                        </div>
                        <div className='author-p-info'>
                          <p className='mb-0'>Owner</p>
                          <h6><Link to={`/author/${seller === address ? '' : seller}`}>{seller}</Link></h6>
                        </div>
                      </div>
                      <ul className='other-info-list'>
                        <li className='item-other-info'>
                          <div className='item-info-title'>
                            <h6>Contract Address</h6>
                          </div>
                          <div className='item-info-details'>
                            <div id='cryptoCode' className='crypto-page'>
                              <input id='cryptoLink'
                                defaultValue={contract}
                                readOnly />
                              <div id='cryptoCopy' data-bs-toggle='tooltip'
                                data-bs-placement='top' title='Copy Address'>
                                <CopyToClipboard text={contract}
                                  onCopy={() => onCopy()}>
                                  <span className='copy-icon'>
                                    <i className={cx('icofont-ui-copy', { copied: copied })} aria-hidden='true'
                                      data-copytarget='#cryptoLink'></i>
                                  </span>
                                </CopyToClipboard>
                              </div>
                            </div>
                          </div>
                        </li>
                        {
                          !!creator && <li className='item-other-info'>
                            <div className='item-info-title'>
                              <h6>Creator</h6>
                            </div>
                            <div className='item-info-details'>
                              <p><Link to={`/author/${creator === address ? '' : creator}`}>{creator}</Link></p>
                            </div>
                          </li>
                        }
                        <li className='item-other-info'>
                          <div className='item-info-title'>
                            <h6>Collection</h6>
                          </div>
                          <div className='item-info-details'>
                            <p>{collection}</p>
                          </div>
                        </li>
                        <li className='item-other-info'>
                          <div className='item-info-title'>
                            <h6>Token ID</h6>
                          </div>
                          <div className='item-info-details'>
                            <p>{tokenId}</p>
                          </div>
                        </li>
                        <li className='item-other-info'>
                          <div className='item-info-title'>
                            <h6>Blockchain</h6>
                          </div>
                          <div className='item-info-details'>
                            <p>VeChain</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    {
                      !!metadata.attributes && metadata.attributes.length > 0 && <div className='attributes-tab tab-pane fade' id='nav-attributes' role='tabpanel'
                        aria-labelledby='nav-attributes-tab'>
                        <ul className='other-info-list'>
                          {
                            metadata.attributes.map(attribute => <li className='item-other-info' style={{ display: 'flex', flexDirection: 'row' }} key={attribute.trait_type}>
                              <div className='item-info-title' style={{ width: '35%' }}>
                                <h6>{toUppercase(attribute.trait_type)}</h6>
                              </div>
                              <div className='item-info-details' style={{ width: '65%' }}>
                                <p>{toUppercase(attribute.value)}</p>
                              </div>
                            </li>)
                          }
                        </ul>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='profile-details'>
              <div className='tab-content' id='nav-tabContent'>
                <div className='tab-pane activity-page fade show active' id='allNft' role='tabpanel'>
                  <div>
                    <div className='row'>
                      <div className='col-xl-12'>
                        <article>
                          <div className='activity-tab'>
                            {
                              price === '-0' && <ul className='nav nav-pills mb-30 px-2' id='pills-tab' role='tablist'>
                                <li className='nav-item' role='presentation'>
                                  <button className='nav-link active'
                                    data-bs-toggle='pill' type='button' role='tab' aria-controls='pills-personal'
                                    onClick={() => setTitle('first')}>
                                    <i className='icofont-money'></i>Sale</button>
                                </li>
                                <li className='nav-item' role='presentation'>
                                  <button className='nav-link'
                                    data-bs-toggle='pill' type='button' aria-controls='pills-mentions'
                                    onClick={() => setTitle('second')}>
                                    <i className='icofont-location-arrow'></i>Transfer</button>
                                </li>
                              </ul>
                            }
                            <div className='tab-content activity-content' id='pills-tabContent'>
                              <div className='tab-pane' role='tabpanel' style={{ display: title === 'first' ? 'block' : 'none' }}>
                                <div className='item-buy-part'>
                                  <div className='nft-item-title'>
                                    <h3>{metadata.name}</h3>
                                  </div>
                                  <Countdown date={new Date(endAt)} renderer={({ days, hours, minutes, seconds, completed }) => completed ? '' : <div
                                    className='item-details-countdown'>
                                    <h4>Ends In:</h4>
                                    <ul className='item-countdown-list count-down'>
                                      <li>
                                        <span className='days'>{days}</span><span className='count-txt'>Days</span>
                                      </li>
                                      <li>
                                        <span className='hours'>{hours}</span><span className='count-txt'>Hours</span>
                                      </li>
                                      <li>
                                        <span className='minutes'>{minutes}</span><span className='count-txt'>Mins</span>
                                      </li>
                                      <li>
                                        <span className='seconds'>{seconds}</span><span className='count-txt'>Secs</span>
                                      </li>
                                    </ul>
                                  </div>
                                  } />
                                  {
                                    price !== '-0' && <div className='item-price'>
                                      <h4>Price</h4>
                                      <p><span><i className='icofont-coins'></i> {price} VET
                                      </span></p>
                                    </div>
                                  }
                                  {
                                    price === '-0' && <div className='row'>
                                      <div className='col'>
                                        <div className='create-nft' style={{ background: 'inherit' }}>
                                          <form className='create-nft-form'>
                                            <div className='item-price-field mb-3'>
                                              <div className='row g-3'>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                  <input type='checkbox'
                                                    className=''
                                                    id='auction'
                                                    checked={auction}
                                                    onChange={e => onChangeAuction(e.target.checked)} />
                                                  <label
                                                    htmlFor='auction' style={{ marginLeft: '10px' }}>Auction</label>
                                                </div>
                                                {
                                                  !auction && <div className={`${hasRoyalty ? 'col-md-12' : 'col-md-12'} col-sm-12`}>
                                                    <div className='form-floating'>
                                                      <input type='number'
                                                        className='form-control'
                                                        id='itemPriceInput'
                                                        placeholder='Item Price'
                                                        min={0}
                                                        value={auctionPrice}
                                                        onChange={e => onChangeAuctionPrice(e.target.value)} />
                                                      <label
                                                        htmlFor='itemPriceInput'>Item
                                                        Price</label>
                                                    </div>
                                                  </div>
                                                }
                                                {
                                                  auction && <div className='col-md-6 col-sm-12'>
                                                    <div className='form-floating'>
                                                      <input type='number'
                                                        className='form-control'
                                                        id='itemPriceInput'
                                                        placeholder='Item Price'
                                                        value={stPrice}
                                                        onChange={e => onChangeStPrice(e.target.value)} />
                                                      <label
                                                        htmlFor='itemPriceInput'>Start
                                                        Price</label>
                                                    </div>
                                                  </div>
                                                }
                                                {
                                                  auction && <div className='col-md-6 col-sm-12'>
                                                    <div className='form-floating'>
                                                      <input type='number'
                                                        className='form-control'
                                                        id='itemPriceInput'
                                                        placeholder='Item Price'
                                                        value={edPrice}
                                                        onChange={e => onChangeEdPrice(e.target.value)} />
                                                      <label
                                                        htmlFor='itemPriceInput'>End
                                                        Price</label>
                                                    </div>
                                                  </div>
                                                }
                                                {
                                                  auction && <div className='col-md-12 col-sm-12'>
                                                    <div className='form-floating'>
                                                      <input type='date'
                                                        className='form-control'
                                                        id='itemPriceInput'
                                                        placeholder='Item Price'
                                                        value={to}
                                                        onChange={e => onChangeTo(e.target.value)} />
                                                      <label
                                                        htmlFor='itemPriceInput'>To</label>
                                                    </div>
                                                  </div>
                                                }
                                                {
                                                  hasRoyalty && <div className='col-md-12 col-sm-12'>
                                                    <div className='form-floating'>
                                                      <input type='number'
                                                        className='form-control'
                                                        id='royaltyInput'
                                                        placeholder='Royalties'
                                                        value={royalty} disabled />
                                                      <label
                                                        htmlFor='royaltyInput'>Royalties</label>
                                                    </div>
                                                  </div>
                                                }
                                              </div>
                                            </div>
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                  }
                                  <div className='buying-btns d-flex flex-wrap'>
                                    {
                                      stPrice >= 0 && !!seller && !!currentUser && !!currentUser.address && seller !== currentUser.address && <button className='default-btn' type='button' onClick={e => buy()} style={{ marginRight: '5px' }}><span>Buy Now</span></button>
                                    }
                                    {
                                      stPrice >= 0 && !!currentUser && !!currentUser.address && seller === currentUser.address && <button className='default-btn' type='button' onClick={e => removeSale()} style={{ marginRight: '5px' }}><span>Remove from Sale</span></button>
                                    }
                                    {
                                      !!currentUser && !!currentUser.address && (price === '-0' || seller === currentUser.address) && <button className='default-btn' type='button' style={{ marginRight: '5px' }} onClick={e => saveAs(download, metadata.name)}><span>Download</span></button>
                                    }
                                    {
                                      price === '-0' && <button className='default-btn' onClick={e => createSale()} style={{ marginRight: '5px' }}><span>Create Sale</span></button>
                                    }
                                  </div>
                                </div>
                              </div>
                              <div className='tab-pane' role='tabpanel' style={{ display: title === 'second' ? 'block' : 'none' }}>
                                <div className='item-buy-part'>
                                  <div className='nft-item-title'>
                                    <h3>{metadata.name}</h3>
                                  </div>
                                  <div className='row'>
                                    <div className='col'>
                                      <div className='create-nft' style={{ background: 'inherit' }}>
                                        <form className='create-nft-form'>
                                          <div className='item-price-field mb-3'>
                                            <div className='row g-3'>
                                              <div className={`${hasRoyalty ? 'col-md-12' : 'col-md-12'} col-sm-12`}>
                                                <div className='form-floating'>
                                                  <input type='text'
                                                    className='form-control'
                                                    id='itemPriceInput'
                                                    placeholder='Destination Address'
                                                    value={destination}
                                                    onChange={e => onChangeDestination(e.target.value)} />
                                                  <label
                                                    htmlFor='itemPriceInput'>Destination Address</label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='buying-btns d-flex flex-wrap'>
                                    <button className='default-btn' onClick={e => transfer()}><span>Transfer</span></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default ItemDetail