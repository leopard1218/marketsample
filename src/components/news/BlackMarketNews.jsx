import NewsCategory from './NewsCategory'
import NewsItem from './NewsItem'
import Pagination from './Pagination'
import PopularPosts from './PopularPosts'
import PopularTags from './PopularTags'
import Search from '../common/Search'

const BlackMarketNews = () => <section className='blog-section padding-top padding-bottom'>
  <div className='container'>
    <div className='main-blog'>
      <div className='row g-5 flex-xl-row-reverse'>
        <div className='col-xl-9 col-12'>
          <div className='blog-wrapper'>
            <div className='row justify-content-center g-4'>
              <div className='col-lg-4 col-sm-6'>
                <NewsItem title='The Rise of the Non Fungible Tokens (NFTs)' date='July 20 2021' author='Jhon doe' image='/assets/images/nft-item/blog/01.jpg' />
              </div>
              <div className='col-lg-4 col-sm-6'>
                <NewsItem title='Top 5 Most Popular NFT Games in 2021' date='July 20 2021' author='Rassel H.' image='/assets/images/nft-item/blog/02.jpg' />
              </div>
              <div className='col-lg-4 col-sm-6'>
                <NewsItem title='Best NFT Selling Marketplace website' date='July 20 2021' author='Alex zym' image='/assets/images/nft-item/blog/03.jpg' />
              </div>
              <div className='col-lg-4 col-sm-6'>
                <NewsItem title='The Rise of the Non Fungible Tokens (NFTs)' date='July 20 2021' author='Jhon doe' image='/assets/images/nft-item/blog/04.jpg' />
              </div>
              <div className='col-lg-4 col-sm-6'>
                <NewsItem title='Top 5 Most Popular NFT Games in 2021' date='July 20 2021' author='Rassel H.' image='/assets/images/nft-item/blog/05.jpg' />
              </div>
              <div className='col-lg-4 col-sm-6'>
                <NewsItem title='Best NFT Selling Marketplace website' date='July 20 2021' author='Alex zym' image='/assets/images/nft-item/blog/06.jpg' />
              </div>
              <div className='col-lg-4 col-sm-6'>
                <NewsItem title='The Rise of the Non Fungible Tokens (NFTs)' date='July 20 2021' author='Jhon doe' image='/assets/images/nft-item/blog/07.jpg' />
              </div>
              <div className='col-lg-4 col-sm-6'>
                <NewsItem title='Top 5 Most Popular NFT Games in 2021' date='July 20 2021' author='Rassel H.' image='/assets/images/nft-item/blog/08.jpg' />
              </div>
              <div className='col-lg-4 col-sm-6'>
                <NewsItem title='Best NFT Selling Marketplace website' date='July 20 2021' author='Alex zym' image='/assets/images/nft-item/blog/09.jpg' />
              </div>
              <div className='col-lg-4 col-sm-6'>
                <NewsItem title='The Rise of the Non Fungible Tokens (NFTs)' date='July 20 2021' author='Jhon doe' image='/assets/images/nft-item/blog/10.jpg' />
              </div>
              <div className='col-lg-4 col-sm-6'>
                <NewsItem title='Top 5 Most Popular NFT Games in 2021' date='July 20 2021' author='Rassel H.' image='/assets/images/nft-item/blog/11.jpg' />
              </div>
              <div className='col-lg-4 col-sm-6'>
                <NewsItem title='Best NFT Selling Marketplace website' date='July 20 2021' author='Alex zym' image='/assets/images/nft-item/blog/12.jpg' />
              </div>
            </div>
          </div>
          <Pagination />
        </div>
        <div className='col-xl-3 col-12'>
          <aside>
            <Search content='news' />
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

export default BlackMarketNews