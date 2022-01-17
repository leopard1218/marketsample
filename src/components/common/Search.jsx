import { toUppercase } from '../../helpers/methods'

const Search = ({ content, label }) => <div className='profile-widget search-widget'>
  <div className='widget-inner'>
    <div className='widget-title'>
      <h5>Search {toUppercase(content)}</h5>
    </div>
    <div className='widget-content'>
      <p>{label}</p>
      <div className='form-floating nft-search-input'>
        <input type='text' className='form-control' id='nftSearch'
          placeholder={`Search ${toUppercase(content)}`} />
        <label htmlFor='nftSearch'>Search {toUppercase(content)}</label>
        <button type='button'> <i className='icofont-search-1'></i></button>
      </div>
    </div>
  </div>
</div>

export default Search