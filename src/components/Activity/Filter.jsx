const Filter = ({ items, onChange }) => <aside className='mt-5 mt-xl-0'>
  <div className='widget widget-tags'>
    <div className='widget-header'>
      <h5 className='title'>Filters By</h5>
    </div>
    <ul className='widget-wrapper justify-content-start'>
      {
        items.map((item, index) => <li key={index} onClick={e => onChange(index)}>
          <a href='#' className={item.active ? 'active' : ''}><i className={item.icon}></i>{item.label}</a>
        </li>)
      }
    </ul>
  </div>
</aside>

export default Filter