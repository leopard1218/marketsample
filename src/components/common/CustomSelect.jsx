import { useState } from "react"

const CustomSelect = ({ label, options, value, onChange }) => {
  const [showCandidate, setShowCandidate] = useState(false)
  // const [hover, setHover] = useState('')
  return <div className='form-floating' style={{ position: 'relative' }} onBlur={e => setShowCandidate(false)}>
    <div
      className='form-floating item-name-field mb-3' style={{ position: 'absolute', top: '0px', left: '0px', width: '100%' }}>
      <input type='text' className='form-control'
        id='itemNameInput'
        placeholder={label}
        value={value}
        onChange={e => {
          onChange(e.target.value)
          setShowCandidate(true)
        }}
        onClick={e => setShowCandidate(true)} />
      <label htmlFor='itemNameInput'>{label}</label>
    </div>
    {
      showCandidate && <div style={{ position: 'absolute', width: '100%', zIndex: 1 }}>
        {
          options.filter(option => option.toLowerCase().includes(value.toLowerCase())).map(option => <div style={{ background: value === option ? '#1E90FF' : '#000000', paddingLeft: '10px' }} onClick={e => {
            onChange(option)
            setShowCandidate(false)
          }}>{option}</div>)
        }
      </div>
    }
  </div>
}

export default CustomSelect