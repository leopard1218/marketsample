import NewsCategory from './NewsCategory'
import PopularPosts from './PopularPosts'
import PopularTags from './PopularTags'
import Search from '../common/Search'

const Blog = () => <section className='blog-section padding-top padding-bottom'>
  <div className='container'>
    <div className='main-blog'>
      <div className='row g-5'>
        <div className='col-xl-9 col-12'>
          <div className='blog-wrapper'>
            <div className='post-item'>
              <div className='post-item-inner'>
                <div className='post-thumb'>
                  <img src='/assets/images/blog/01.gif' alt='blog' />
                </div>
                <div className='post-content'>
                  <span className='meta'>By <a href='replace'>Admin</a> March 24, 2021</span>
                  <h3>A wonderf serenity has taken poesion of my entire souin like these sweet
                    mornins</h3>
                  <p>A wonderf serenity has taken poesion of my entire souin like these sweet
                    mornins sprin which enjy with my whole hear I am alone and feel the charm
                    of existen spot which was creatie For the blisse of souls like mineingi am
                    so
                    happy my dear friend, so absoribed in the exquisite sense tranquilera
                    existence, that I neglect my talentsri I should bye incapable of drawin and
                    sinle stroke A wonderful serenity has taken possession of my entire souing
                    like these sweet mornins sprng enjoy with mye whole heart. I am alone, and
                    feel the charm of existthis spot which was creatied the bliss of souls like
                    mineingi am so happy my dear friend, so absoribed in the exquisite sense
                    tranquil existnce, dt I neglect my talentsri I should bye incapable of
                    drawin and single stroke enjoy with my whole hrt. I am alone, and feel the
                    charm of existencethis spot which was For the bliss of souls like mineingis
                    am so happy my dear friend, so absoribed in the exquisite sense tranquil
                    existence, that I neglects my talentsri I should bye incapable of drawing
                    and
                    single the present moment; and yet If feel that I never was a greater artst

                  </p>
                  <blockquote>
                    <p>Steal into The inner Sanc Thro Myse Down Amon The Hall Gras Buzz The
                      Little World Amon The Staks And Grow Famar With Count And Fies Then
                      The Presence of The Almighty Among The Staks </p>
                  </blockquote>
                  <p>A wonderf serenity has taken poesion of my entire souin like these sweet
                    mornins sprin which enjy with my whole hear I am alone and feel the charm
                    of existen spot which was creatie For the blisse of souls like mineingi am
                    so
                    happy my dear friend, so absoribed in the exquisite sense tranquilera
                    existence, that I neglect my talentsri I should bye incapable of drawin and
                    sinle stroke A wonderful serenity has taken possession of my entire souing
                    like these sweet mornins sprng enjoy with mye whole heart. I am alone, and
                    feel the charm of existthis spot which was creatied the bliss of souls like
                    mineingi am so happy my dear friend, so absoribed in the exquisite sense
                    tranquil existnce, dt I neglect my talentsri I should bye incapable of
                    drawin and single stroke enjoy with my whole hrt. I am alone, and feel the
                    charm of existencethis spot which was For the bliss.
                  </p>
                </div>
                <div className='tags-section'>
                  <ul className='tags'>
                    <li><span><i className='icofont-tags'></i></span></li>
                    <li><a href='replace'>NFT</a></li>
                    <li><a href='replace'>Token</a></li>
                    <li><a href='replace'>Crypto</a></li>
                    <li><a href='replace'>Ethereum</a></li>
                  </ul>
                  <ul className='social-link-list d-flex flex-wrap'>
                    <li><a href='replace' className='facebook'><i className='icofont-facebook'></i></a></li>
                    <li><a href='replace' className='dribble'><i className='icofont-dribble'></i></a></li>
                    <li><a href='replace' className='twitter'><i className='icofont-twitter'></i></a></li>
                    <li><a href='replace' className='linkedin'><i className='icofont-linkedin'></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div id='comments' className='comments'>
              <div className='widget-title'>
                <h3>02 Comments</h3>
              </div>
              <ul className='comment-list'>
                <li className='comment' id='li-comment-2'>
                  <div className='com-image'>
                    <img alt='author' src='/assets/images/seller/04.png' className='avatar'
                      height='70' width='70' />
                  </div>
                  <div className='com-content'>
                    <div className='com-title'>
                      <div className='com-title-meta'>
                        <h4><a href='replace' rel='external nofollow' className='url'>rassel
                          mrh</a></h4>
                        <span> October 5, 2021 at 12:41 pm </span>
                      </div>
                      <span className='reply'>
                        <a rel='nofollow' className='comment-reply-link' href='replace'><i
                          className='icofont-reply-all'></i>
                          Reply</a>
                      </span>
                    </div>
                    <p>The inner sanctuary, I throw myself down among the tall grass bye the
                      trckli stream and, as I lie close to the earth</p>
                  </div>
                  <ul className='comment-list'>
                    <li className='comment even thread-even depth-1 comment' id='li-comment-3'>
                      <div className='com-image'>
                        <img alt='author' src='/assets/images/seller/01.gif' className='avatar'
                          height='70' width='70' />
                      </div>
                      <div className='com-content'>
                        <div className='com-title'>
                          <div className='com-title-meta'>
                            <h4><a href='http://Sk' rel='external nofollow'
                              className='url'>R3b ca</a></h4>
                            <span> October 5, 2021 at 12:41 pm </span>
                          </div>
                          <span className='reply'>
                            <a rel='nofollow' className='comment-reply-link' href='replace'><i
                              className='icofont-reply-all'></i> Reply</a>
                          </span>
                        </div>
                        <p>A wonderful serenity has taken possession of my entire soul, like
                          these sweet mornings spring which I enjoy with my whole heart
                        </p>
                        <div className='reply-btn'>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div id='respond' className='comment-respond'>
              <div className='add-comment'>
                <div className='widget-title'>
                  <h3>Leave a Comment</h3>
                </div>
                <form action='#' method='post' id='commentform' className='comment-form' novalidate=''>
                  <div className='row w-100 g-3'>
                    <div className='col-lg-6'>
                      <div className='form-floating'>
                        <input type='text' className='w-100 comment-input form-control'
                          id='authorName' placeholder='Full Name' />
                        <label htmlFor='authorName'>Full Name</label>
                      </div>
                    </div>
                    <div className='col-lg-6'>
                      <div className='form-floating'>
                        <input type='email' className='w-100 comment-input form-control'
                          id='authorEmail' placeholder='Your Email' />
                        <label htmlFor='authorEmail'>Your Mail</label>
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='form-floating w-100'>
                        <input type='text' className='w-100 comment-input form-control'
                          id='cmntSub' placeholder='Subject' />
                        <label htmlFor='cmntSub'>Subject</label>
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='form-floating w-100 mb-4'>
                        <textarea className='form-control' placeholder='Leave a comment here'
                          id='floatingTextarea'></textarea>
                        <label htmlFor='floatingTextarea'>Comments</label>
                      </div>
                    </div>
                    <button className='default-btn move-right' type='submit'><span>Send
                      Comment</span></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-3 col-12'>
          <aside>
            <Search content='blog' />
            <NewsCategory items={[{ label: 'New Collections', cnt: 6 }, { label: 'Updates', cnt: 11 }, { label: 'Collabs', cnt: 7 }, { label: 'Give aways', cnt: 9 }]} current='Collabs' />
            <PopularPosts posts={[
              {
                title: 'Poor People’s Campaign Our Resources',
                date: 'July 23,2021',
                image: '/assets/images/blog/01.jpg'
              },
              {
                title: 'Boosting Social For NGO And Charities',
                date: 'July 23,2021',
                image: '/assets/images/blog/02.jpg'
              },
              {
                title: 'Poor People’s Campaign Our Resources',
                date: 'July 23,2021',
                image: '/assets/images/blog/03.jpg'
              }
            ]} />
            <PopularTags tags={['VeThugs', 'BlackVeMarket']} active='BlackVeMarket' />
          </aside>
        </div>
      </div>
    </div>
  </div>
</section>

export default Blog