import React, { useEffect, useState } from 'react';

import MembersSelect from '../MembersSelect'

export default ({
  createRole,
  editRole,
  changeIsSended,
  searchUsers,
  searchedUsers,
  role,
  changeRole,
  search,
  changeSearch,
  onOutsideClick
}) => {

  const manageRole = (e) => {
    e.preventDefault()

    if (role._id)
      editRole(role)
    else
      createRole(role)

    changeIsSended(true)

  }

  useEffect(() => {

    searchUsers(search)

  }, [search])

  return (
    <div onClick={e => e.target.id == 'defaultModal' ? onOutsideClick() : null} className={"modal fade overflow-auto show d-inline-block"} id="defaultModal" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="title" id="defaultModalLabel">{role._id ? 'Обновить роль' : 'Создать роль'}</h4>
          </div>
          <div className="modal-body">
            <form onSubmit={manageRole}>

              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">Название</span>
                </div>
                <input type="text" required value={role.name} onChange={e => changeRole({ ...role, name: e.target.value })} className="form-control d-inline-block m-0" />
              </div>

              <div className="input-group mb-2">
                <MembersSelect
                  search={search}
                  changeSearch={changeSearch}
                  values={searchedUsers}
                  members={role.members}
                  changeMembers={(members) => changeRole({ ...role, members })}
                />
              </div>

              <div className="w-100 d-flex justify-content-center">
                <button type={'submit'} className="btn btn-success m-0">{role._id ? 'Обновить' : 'Создать'}</button>
              </div>

            </form>
          </div>
          <div className="modal-footer">
            <button onClick={onOutsideClick} type="button" className="btn btn-danger waves-effect" data-dismiss="modal">Закрыть</button>
          </div>
        </div>
      </div>
    </div>

  )

}