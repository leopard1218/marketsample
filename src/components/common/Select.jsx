const Select = ({ label, options, value, onChange }) => <div className='form-floating'>
  <select className='form-select' id='catSelect' aria-label='Floating label select example' value={value} onChange={onChange}>
    {
      options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)
    }
  </select>
  <label htmlFor='catSelect'>{label}</label>
</div>

export default Select