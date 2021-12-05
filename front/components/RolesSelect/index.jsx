import React, { useEffect, useState, useRef } from 'react';

export default ({
  search,
  changeSearch,
  values = [],
  roles = [],
  changeRoles
}) => {
  const Select = useRef()
  const [Visible, changeVisible] = useState(false);

  useEffect(() => {

    window.addEventListener('click', e => {
      if (Select.current && !Select.current.contains(e.target))
        changeVisible(false)
    })

    return () => {
      window.removeEventListener('click', e => {
        if (Select.current && !Select.current.contains(e.target))
          changeVisible(false)
      })
    }

  }, [])

  return (
    <div ref={Select} className={'own-custom-select w-100'}>
      <div className={'own-custom-select-input'}>
        <div className="custom-input-07">
          <div className="enter">
            <div className="input">
              {
                roles.map((v, i) => (
                  <div key={i} className={'value'}>
                    <span className='info-text'>
                      {v.name}
                    </span>
                    <a onClick={() => changeRoles(roles.filter(rv => rv._id != v._id))} className="delete"></a>
                  </div>
                ))
              }
              <input placeholder={'Роли'} onClick={() => !Visible ? changeVisible(true) : null} className={'w-100'} type="text" value={search} onChange={e => changeSearch(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className={Visible && values.filter(v => v.name.indexOf(search) != -1).length > 0 ? 'own-custom-select-list' : 'own-custom-select-list none'}>
        <ul>
          {
            values.filter(v => v.name.indexOf(search) != -1).map((v, i) => (
              <li key={i}>
                <a className={'w-100 d-inline-block'} onClick={() => changeRoles(!roles.find(rv => rv._id == v._id) ? [...roles, v] : roles)}>
                  {v.name}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    </div >
  )

}