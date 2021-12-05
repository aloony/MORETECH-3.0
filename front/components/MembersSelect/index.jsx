import React, { useEffect, useState, useRef } from 'react';

export default ({
  search,
  changeSearch,
  values = [],
  members = [],
  changeMembers
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
                members.map((v, i) => (
                  <div key={i} className={'value'}>
                    <span className='info-text'>
                      {v.email}
                    </span>
                    <a onClick={() => changeMembers(members.filter(mv => mv.email != v.email))} className="delete"></a>
                  </div>
                ))
              }
              <input placeholder={'Пользователи'} onClick={() => !Visible ? changeVisible(true) : null} className={'w-100'} type="text" value={search} onChange={e => changeSearch(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className={Visible && values.length > 0 ? 'own-custom-select-list' : 'own-custom-select-list none'}>
        <ul>
          {
            values.map((v, i) => (
              <li key={i}>
                <a className={'w-100 d-inline-block'} onClick={() => changeMembers(!members.find(mv => mv.email == v.email) ? [...members, v] : members)}>
                  {v.email}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    </div >
  )

}