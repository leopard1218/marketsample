import PopularArtistItem from './PopularArtistItem'

const PopularArtists = ({ collections }) => <section className='topseller-section padding-bottom'>
  <div className='container-xl container-lg container-md container-sm'>
    <div className='section-header style-2'>
      <div className='header-shape'><span></span></div>
      <h3>Browse By Collection</h3>
    </div>
    <div className='section-wrapper'>
      <div className='nft-sell-wrapper'>
        <div className='row justify-content-center gx-4 gy-3'>
          {
            collections.map(collection => <PopularArtistItem key={collection.name} nftImg={collection.bannerImg} artistImg={collection.symbolImg} ranking='01' name={collection.name} link={`/explore/all/collections/${collection.contractAddress}`} />)
          }
          {/* <PopularArtistItem nftImg='/assets/images/nft-item/style-2/01.jpg' artistImg='/assets/images/seller/04.png' ranking='01' name='VeThugs' price='$23,002.98' />
          <PopularArtistItem nftImg='/assets/images/nft-item/style-2/02.jpg' artistImg='/assets/images/seller/02.gif' ranking='02' name='VeKings' price='$23,002.98' />
          <PopularArtistItem nftImg='/assets/images/nft-item/style-2/03.jpg' artistImg='/assets/images/seller/03.png' ranking='03' name='VeGhosts' price='$23,002.98' />
          <PopularArtistItem nftImg='/assets/images/nft-item/style-2/04.jpg' artistImg='/assets/images/seller/05.gif' ranking='04' name='VeSkullz' price='$23,002.98' />
          <PopularArtistItem nftImg='/assets/images/nft-item/style-2/05.jpg' artistImg='/assets/images/seller/02.png' ranking='05' name='VeBalls' price='$23,002.98' />
          <PopularArtistItem nftImg='/assets/images/nft-item/style-2/06.jpg' artistImg='/assets/images/seller/07.gif' ranking='06' name='VeThugs' price='$23,002.98' />
          <PopularArtistItem nftImg='/assets/images/nft-item/style-2/07.jpg' artistImg='/assets/images/seller/05.png' ranking='07' name='VeKings' price='$23,002.98' />
          <PopularArtistItem nftImg='/assets/images/nft-item/style-2/08.jpg' artistImg='/assets/images/seller/04.gif' ranking='08' name='VeGhosts' price='$23,002.98' /> */}
        </div>
      </div>
    </div>
  </div>
</section>

export default PopularArtists