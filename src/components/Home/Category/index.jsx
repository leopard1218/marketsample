import Carousel from './Carousel'

import { artContractAddr, musicContractAddr, collectibleContractAddr, cartoonContractAddr } from '../../../constants/contracts'

const Category = () => <section className='category-section padding-top padding-bottom'>
  <div className='container-xl container-lg container-md container-sm'>
    <div className='section-header style-2'>
      <div className='header-shape'><span></span></div>
      <h3>Browse By Catergory</h3>
    </div>
    <div className='section-wrapper'>
      <div className='category-wrapper'>
        <div className='row justify-content-center g-4'>
          <div className='col-lg-3 col-md-6 col-sm-6'>
            {/* <img src='/assets/images/collections/art.jpg'/> */}
            {/* <Carousel images={['/assets/images/nft-item/category/04.jpg',
              '/assets/images/nft-item/category/05.jpg',
              '/assets/images/nft-item/category/06.jpg']}
              title='Art' /> */}
            <Carousel images={['/assets/images/collections/art.jpg']}
              title='Art' link={`/explore/all/created/${artContractAddr}`} />
          </div>
          <div className='col-lg-3 col-md-6 col-sm-6'>
            {/* <Carousel images={['/assets/images/nft-item/category/04.jpg',
              '/assets/images/nft-item/category/05.jpg',
              '/assets/images/nft-item/category/06.jpg']}
              title='Music' /> */}
            <Carousel images={['/assets/images/collections/cartoon.jpg']}
              title='Cartoon' link={`/explore/all/created/${cartoonContractAddr}`} />
          </div>
          <div className='col-lg-3 col-md-6 col-sm-6'>
            {/* <Carousel images={['/assets/images/nft-item/category/07.jpg',
              '/assets/images/nft-item/category/08.jpg',
              '/assets/images/nft-item/category/09.jpg']}
              title='Collectibles' /> */}
            <Carousel images={['/assets/images/collections/collectibles.jpg']}
              title='Collectibles' link={`/explore/all/created/${collectibleContractAddr}`} />
          </div>
          <div className='col-lg-3 col-md-6 col-sm-6'>
            {/* <Carousel images={['/assets/images/nft-item/category/10.jpg',
              '/assets/images/nft-item/category/11.jpg',
              '/assets/images/nft-item/category/12.jpg']}
              title='Cartoon' /> */}
            <Carousel images={['/assets/images/collections/music.jpg']}
              title='Music' link={`/explore/all/created/${musicContractAddr}`} />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

export default Category