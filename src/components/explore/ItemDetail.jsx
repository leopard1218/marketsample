import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Countdown from 'react-countdown'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import cx from 'classnames'

import { toUppercase, useInterval } from '../../helpers/methods'

const ItemDetail = ({ metadata, contract, tokenId, seller, duration, price, collection, endAt, buy, currentUser, hasRoyalty, auction, to, stPrice, edPrice, address, auctionPrice, createSale, onChangeAuction, onChangeTo, onChangeStPrice, onChangeEdPrice, onChangeAuctionPrice, removeSale }) => {
  const [tmp, setTmp] = useState(0)
  const [copied, setCopied] = useState(false)
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
                  <img src={metadata.image} alt='item-img' />
                </div>
                <div className='item-desc-content'>
                  <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                      <button className='nav-link active' id='nav-details-tab' data-bs-toggle='tab'
                        data-bs-target='#nav-details' type='button' role='tab'
                        aria-controls='nav-details' aria-selected='true'>Details</button>
                      {/* <button className='nav-link' id='nav-history-tab' data-bs-toggle='tab'
                      data-bs-target='#nav-history' type='button' role='tab'
                      aria-controls='nav-history' aria-selected='false'>History</button> */}
                      {
                        !!metadata.attributes && metadata.attributes.length > 0 && <button className='nav-link' id='nav-attributes-tab' data-bs-toggle='tab'
                          data-bs-target='#nav-attributes' type='button' role='tab'
                          aria-controls='nav-attributes' aria-selected='false'>Attributes</button>
                      }
                    </div>
                  </nav>
                  <div className='tab-content' id='nav-tabContent'>
                    <div className='details-tab tab-pane fade show active' id='nav-details'
                      role='tabpanel' aria-labelledby='nav-details-tab'>
                      <p>{metadata.description}</p>
                      <div className='author-profile d-flex flex-wrap align-items-center gap-15'>
                        <div className='author-p-thumb'>
                          <Link to='/author/123'><img src='/assets/images/seller/02.gif'
                            alt='author-img ' /></Link>
                        </div>
                        <div className='author-p-info'>
                          <p className='mb-0'>Owner</p>
                          <h6><Link to='/author/123'>{seller || address}</Link></h6>
                        </div>
                      </div>
                      <ul className='other-info-list'>
                        <li className='item-other-info'>
                          <div className='item-info-title'>
                            <h6>Contact Address</h6>
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
                    {/* <div className='history-tab tab-pane fade' id='nav-history' role='tabpanel'
                    aria-labelledby='nav-history-tab'>
                    <ul className='item-histo-list'>
                      <li className='histo-item'>
                        <p>Created by <Link to='/author/123'>@alex joe</Link></p>
                        <time>2021-08-04 23:05:07</time>
                      </li>
                      <li className='histo-item'>
                        <p>Listed by <Link to='/author/123'>@alex joe</Link></p>
                        <time>2021-08-04 20:05:07</time>
                      </li>
                      <li className='histo-item'>
                        <p>Owned by <Link to='/author/123'>@alex joe</Link></p>
                        <time>2021-08-04 22:05:07</time>
                      </li>
                    </ul>
                  </div> */}
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
            <div className='item-buy-part'>
              <div className='nft-item-title'>
                <h3>{metadata.name}</h3>
                {/* <div className='share-btn'>
                <div className=' dropstart'>
                  <a className=' dropdown-toggle' href='replace' role='button' data-bs-toggle='dropdown'
                    aria-expanded='false' data-bs-offset='25,0'>
                    <i className='icofont-share-alt'></i>
                  </a>
                  <ul className='dropdown-menu'>
                    <li><a className='dropdown-item' href='replace'><span>
                      <i className='icofont-twitter'></i>
                    </span> Twitter </a>
                    </li>
                    <li><a className='dropdown-item' href='replace'><span><i
                      className='icofont-telegram'></i></span> Telegram</a></li>
                    <li><a className='dropdown-item' href='replace'><span><i
                      className='icofont-envelope'></i></span> Email</a></li>
                  </ul>
                </div>
              </div> */}
              </div>
              <Countdown date={new Date(endAt)} renderer={({ days, hours, minutes, seconds, completed }) => {
                console.log('countdown render')
                return completed ? '' : <div
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
              }} />
              {
                (endAt === 0 || endAt > new Date().getTime()) && <div className='item-price'>
                  <h4>Price</h4>
                  <p><span><i className='icofont-coins'></i> {price} VET
                  </span></p>
                </div>
              }
              {
                (endAt === 0 || endAt > new Date().getTime()) && seller !== currentUser.address && <div className='buying-btns d-flex flex-wrap'>
                  <button className='default-btn move-right' type='button' onClick={e => buy()}><span>Buy Now</span></button>
                </div>
              }
              {
                (endAt === 0 || endAt > new Date().getTime()) && seller === currentUser.address && <div className='buying-btns d-flex flex-wrap'>
                  <button className='default-btn move-right' type='button' onClick={e => removeSale()}><span>Remove from Sale</span></button>
                </div>
              }
              {
                endAt === -1 && <div className='row'>
                  <div className='col'>
                    <div className='create-nft' style={{ background: 'inherit' }}>
                      <form className='create-nft-form'>
                        <div className='item-price-field mb-3'>
                          <div className='row g-3'>
                            {/* <div className='col-md-4 col-sm-12'>
                          <div className='form-floating'>
                            <select className='form-select'
                              id='selectCrypto'
                              aria-label='Floating label select'>
                              <option value={0}>
                                VeChain
                              </option>
                              <option value={1}>
                                VeStacks
                              </option>
                            </select>
                            <label
                              htmlFor='selectCrypto'>Select
                              Currency</label>
                          </div>
                        </div> */}
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
                                    value={5} disabled />
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
              {
                endAt === -1 && <div className='buying-btns d-flex flex-wrap'>
                  <button className='default-btn move-right' onClick={e => createSale()}><span>Create Sale</span></button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default ItemDetail