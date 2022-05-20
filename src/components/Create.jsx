const Create = ({ name, file, description, data, type, setName, setDescription, onFileChanged, create }) => <div className='login-section padding-top padding-bottom'>
  <div className=' container'>
    <div className='row g-5 align-items-center flex-md-row-reverse'>
      <div className='col-lg-3 col-md-2 col-sm-0' />
      <div className='col-lg-6 col-md-8 col-sm-12'>
        <div className='account-wrapper'>
          <h3 className='title'>Create NFT</h3>
          <form className='account-form'>
            <div className='form-floating mb-3' style={{ height: '58px', backgroundColor: '#000000', borderRadius: '0.25rem', display: 'flex', justifyContent: 'left', alignItems: 'center', position: 'relative' }}>
              <div style={{ padding: '10px' }}>{file || 'Add File'}</div>
              <input type='file' className='form-control' id='userIdInput' placeholder='user-id' style={{ position: 'absolute', width: '100%', height: '100%', opacity: '0' }} onChange={e => onFileChanged(e)} />
            </div>
            {!!data && type === 'image' && <img className='mb-3' style={{ width: '100%', height: 'auto' }} src={data} alt='no-content' />}
            {!!data && type === 'video' && <video className='mb-3' style={{ width: '100%', height: 'auto' }} src={data} alt='no-content' autoPlay />}
            {!!data && type === 'audio' && <audio className='mb-3' style={{ width: '100%' }} autoPlay controls >
              <source src={data} />
            </audio>}
            <div className='form-floating mb-3'>
              <input type='text' className='form-control' id='floatingInput'
                placeholder='NFT Name' value={name} onChange={e => setName(e.target.value)} />
              <label htmlFor='floatingInput'>Name</label>
            </div>
            <div className='form-floating mb-3'>
              <input type='text' className='form-control' id='description'
                placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
              <label htmlFor='description'>Description</label>
            </div>
            <div className='form-group'>
              <button type='button' className='d-block default-btn move-top' onClick={e => create()}><span>Create</span></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

export default Create