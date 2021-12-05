import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import ManageRolesModal from './../ManageRoleModal'

import { createRole, editRole, deleteRole } from '../../store/actions/roles.actions'
import { searchUsers } from '../../store/actions/user.actions'
import { toast } from 'react-toastify';

export default connect((s) => ({
  searchedUsers: s.user.searched,
  ownRoles: s.roles.state,

}), {
  createRole,
  editRole,
  deleteRole,
  searchUsers
})(
  ({
    searchedUsers,
    ownRoles,

    createRole,
    editRole,
    deleteRole,
    searchUsers
  }) => {
    const [IsSended, changeIsSended] = useState(false)
    const [RolesModal, changeRolesModal] = useState({
      show: false,
      role: {
        _id: '',
        name: '',
        members: []
      },
      search: ''
    })

    const confirmDeleteRole = (_id) =>
      toast.warning('Вы уверены, что хотите удалить эту роль? Кликните, если согласны', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        onClick: () => {
          deleteRole({ _id })
        },
        pauseOnHover: true,
        draggable: true,
      });

    const openRolesModal = (role) => changeRolesModal({ ...RolesModal, role: role ? role : { _id: '', name: '', members: [] }, show: true })
    const closeRolesModal = () => changeRolesModal({ ...RolesModal, role: { _id: '', name: '', members: [] }, show: false })

    useEffect(() => {

      if (IsSended) {
        toast.success('Роль успешно обновлена', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        closeRolesModal()
        changeIsSended(false)
      }

    }, [ownRoles])

    return (
      <section className="content">
        {
          RolesModal.show
            ? <ManageRolesModal
              createRole={createRole}
              editRole={editRole}
              changeIsSended={changeIsSended}
              searchUsers={searchUsers}
              searchedUsers={searchedUsers}
              role={RolesModal.role}
              changeRole={(role) => changeRolesModal({ ...RolesModal, role })}
              search={RolesModal.search}
              changeSearch={(search) => changeRolesModal({ ...RolesModal, search })}
              onOutsideClick={closeRolesModal}
            />
            : null
        }
        <div className="">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>Роли</h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">
                <button className="btn btn-primary" onClick={() => openRolesModal()}>
                  <span className={'text-white'}>Создать роль</span>
                </button>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row clearfix">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Название </th>
                    <th>Пользователи</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    ownRoles.map((v, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{v.name}</td>
                        <td>{v.members.map(v => v.email).join(', ')}</td>
                        <td className={'text-right'}>
                          <button type="button" className="btn btn-default" onClick={() => openRolesModal(v)}>
                            <span className="btn-label">
                              <i className="zmdi zmdi-edit"></i>
                            </span>
                          </button>
                          <button type="button" className="btn btn-default" onClick={() => confirmDeleteRole(v._id)}>
                            <span className="btn-label">
                              <i className="zmdi zmdi-delete"></i>
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section >
    )

  }
);