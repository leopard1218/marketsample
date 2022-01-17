const Banner = ({ title, subtitle }) => <section className='page-header-section style-1'>
  <div className='container'>
    <div className='page-header-content'>
      <div className='page-header-inner'>
        <div className='page-title'>
          <h2>{title}</h2>
        </div>
        <ol className='breadcrumb' style={{marginTop:15}}>
          <li className='active'>{subtitle}</li>
        </ol>
      </div>
    </div>
  </div>
</section>

export default Banner