import cx from 'classnames'
const PopularTags = ({ tags, active }) => <div className='widget widget-tags'>
  <div className='widget-header'>
    <h5 className='title'>Our Popular Tags</h5>
  </div>
  <ul className='widget-wrapper'>
    {
      tags.map(tag => <li><a href='replace' className={cx({ active: tag === active })}>{tag}</a></li>)
    }
  </ul>
</div>

export default PopularTags