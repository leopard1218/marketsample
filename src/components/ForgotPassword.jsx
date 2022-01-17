import { Link } from 'react-router-dom'

const ForgotPassword = () => <div className='login-section padding-top padding-bottom'>
  <div className=' container'>
    <div className='row g-5 align-items-center flex-md-row-reverse'>
      <div className='col-lg-5'>
        <div className='account-wrapper'>
          <h3 className='title'>Reset Password</h3>
          <form className='account-form'>
            <div className='form-floating mb-3'>
              <input type='email' className='form-control' id='floatingInput'
                placeholder='name@example.com' />
              <label htmlFor='floatingInput'>Email address</label>
            </div>
            <div className='form-group px-3'>
              <div className='d-flex justify-content-between flex-wrap pt-sm-2'>
                <Link to='/signin'>SignIn</Link>
                <Link to='/signup'>SignUp</Link>
              </div>
            </div>
            <div className='form-group mb-0'>
              <button className='d-block default-btn move-top'><span>Reset Now</span></button>
            </div>
          </form>
        </div>
      </div>
      <div className='col-lg-7'>
        <div className='account-img'>
          <img src='assets/images/account/01.png' alt='img' />
        </div>
      </div>
    </div>
  </div>
</div>

export default ForgotPassword