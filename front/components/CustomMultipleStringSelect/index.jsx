import React, { useEffect, useState, useRef } from 'react';

export default ({
  values,
  onChange,
  onDelete,
  info
}) => {
  const Select = useRef()
  const [Values, changeValues] = useState(values);
  const [CurrentValue, changeCurrentValue] = useState('');

  const setValue = () => {
    if (CurrentValue) {
      changeCurrentValue('')
      onChange(CurrentValue)
    }
  }

  const deleteValue = (v) => onDelete(v)

  useEffect(() => {

    changeValues(values)

  }, [values])

  return (
    <div ref={Select} className={'own-custom-select'}>
      <div className={'own-custom-select-input'}>
        <div className="custom-input-07">
          <div className="enter">
            <div className="input">
              {
                Values.map((v, i) => (
                  <div key={i} className={'value'}>
                    <span className='info-text'>
                      {v}
                    </span>
                    <a onClick={() => deleteValue(v)} className="delete"></a>
                  </div>
                ))
              }
              <input onSubmitCapture={e => console.log('e')} onKeyUp={e => { e.preventDefault(); e.key === 'Enter' || e.keyCode === 13 ? setValue() : null }} className={info ? 'standart-text w-100' : ' w-100'} type="text" value={CurrentValue} onChange={e => changeCurrentValue(e.target.value)} />
            </div>
            <a className={'button'} onClick={setValue}></a>
          </div>
        </div>
      </div>
    </div >
  )

}