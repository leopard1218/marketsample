import cx from 'classnames'

const NewsCategory = ({ items, current }) => <div className='widget widget-category'>
  <div className='widget-header'>
    <h5 className='title'>News Category</h5>
  </div>
  <ul className='widget-wrapper'>
    {
      items.map(item => <li>
        <a href='replace' className={cx('d-flex flex-wrap justify-content-between', { active: item.label === current })}><span><i
          className='icofont-double-right'></i>{item.label}</span><span>{item.cnt}</span></a>
      </li>)
    }
  </ul>
</div>

export default NewsCategory