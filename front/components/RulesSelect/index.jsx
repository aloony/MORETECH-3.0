import React, { useEffect, useState, useRef } from 'react';

export default ({
  rules = [],
  changeRules
}) => {
  const Select = useRef()
  const [CurrentValue, changeCurrentValue] = useState('');

  const addRule = () => {
    changeRules([...rules, CurrentValue.trim()])

    changeCurrentValue('')
  }

  return (
    <div ref={Select} className={'own-custom-select'}>
      <div className={'own-custom-select-input'}>
        <div className="custom-input-07">
          <div className="enter">
            <div className="input">
              {
                rules.map((v, i) => (
                  <div key={i} className={'value'}>
                    <span className='info-text'>
                      {v}
                    </span>
                    <a onClick={() => changeRules(rules.filter(rv => rv != v))} className="delete"></a>
                  </div>
                ))
              }
              <input placeholder={'Правило'} onKeyUp={e => { e.preventDefault(); e.key === 'Enter' || e.keyCode === 13 ? addRule() : null }} className={'standart-text w-100'} type="text" value={CurrentValue} onChange={e => changeCurrentValue(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div >
  )

}