const Footer = () => <footer className='footer-section style-2'>
  <div className='footer-top' style={{ backgroundImage: 'url(/assets/images/footer/bg-2.jpg)' }}>
    <div className='footer-newsletter'>
      <div className='container'>
        <div className='row g-4 align-items-center justify-content-center'>
          <div className='col-lg-6'>
            <div className='newsletter-part'>
              <div className='ft-header'>
                <h4>Get The Latest BlackVeMarket Updates</h4>
              </div>
              <form action='mailto:subscribe@BlackVeMarket.com'>
                <input type='email' placeholder='Your Mail Address' />
                <button type='submit' data-blast='bgColor'> Subscribe now</button>
              </form>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='social-part ps-lg-5'>
              <div className='ft-header'>
                <h4>Join the Community</h4>
              </div>
              <ul className='social-list d-flex flex-wrap align-items-center mb-0'>
                <li className='social-link'><a href='https://twitter.com/VeThugs'
                  data-blast='bgColor'><i className='icofont-twitter'></i></a></li>
                <li className='social-link'><a href='https://discord.gg/V9TMVR8x'
                  data-blast='bgColor'><i className='icofont-user'></i></a></li>
                <li className='social-link'><a href='https://www.instagram.com/vethugsofficial/'
                  data-blast='bgColor'><i className='icofont-instagram'></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <div className='container'>
          <p className='text-center py-4 mb-0'>All rights reserved &copy; BlackVeMarket || Developed By:
            CryptoMoon
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>

export default Footer