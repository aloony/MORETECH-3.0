import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import LoginPage from '../../pages/Login';
import HomePage from '../../pages/Home';
import RolesPage from '../../pages/Roles';

import Sidebar from '../Sidebar';

import { getCurrentAccountInfo, clearAllUserErrors } from './../../store/actions/user.actions'
import { getDatahubData, clearAllDathubError } from '../../store/actions/datahub.actions'
import { getUserOwnRoles, clearAllRolesError } from '../../store/actions/roles.actions'

const RestrictAccessRoute = ({ exact, path, render, forAuth = true, forRoles = [], role, auth, to, roleTo }) => {

  if (
    (forRoles.length > 0 && forRoles.indexOf(role) != -1 && ((!forAuth && !auth) || (forAuth && auth)))
    ||
    (forRoles.length == 0 && ((!forAuth && !auth) || (forAuth && auth)))
  ) {
    return <Route exact={exact} path={path} render={render} />
  } else if (path == '/login' && !auth) {
    return <Redirect to={to} />
  } else if (forRoles.length > 0 && forRoles.indexOf(role) == -1 && ((!forAuth && !auth) || (forAuth && auth))) {
    return <Redirect to={roleTo} />
  } else {
    return <Redirect to={to} />
  }
}

export default connect((s) => ({
  user: s.user.state,
  userError: s.user.error,
  datahubError: s.datahub.error,
  rolesError: s.roles.error,
}), {
  getCurrentAccountInfo,
  clearAllUserErrors,
  getDatahubData,
  clearAllDathubError,
  getUserOwnRoles,
  clearAllRolesError,
})(
  ({
    user,
    userError,
    datahubError,
    rolesError,

    getCurrentAccountInfo,
    clearAllUserErrors,
    getDatahubData,
    clearAllDathubError,
    getUserOwnRoles,
    clearAllRolesError,
  }) => {
    const history = useHistory()
    const [PathName, changePathName] = useState(location.pathname)

    useEffect(() => {
      return history.listen((location) => changePathName(location.pathname))
    }, [history])

    useEffect(() => {

      getCurrentAccountInfo()

    }, [])

    useEffect(() => {

      if (user && user.googleId) {
        getDatahubData()
        getUserOwnRoles()
      }

    }, [user?.googleId])

    useEffect(() => {

      if (userError) {
        toast.error(userError, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        clearAllUserErrors()
      }

    }, [userError])

    useEffect(() => {

      if (datahubError) {
        toast.error(datahubError, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        clearAllDathubError()
      }

    }, [datahubError])

    useEffect(() => {

      if (rolesError) {
        toast.error(rolesError, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        clearAllRolesError()
      }

    }, [rolesError])

    return (
      <div className='text-body d-inline-block w-100'>
        <ToastContainer />

        {
          ['/login', '/registration', '/recovery', '/shared-stats'].indexOf(PathName) == -1 && user?.googleId
            ? <Sidebar PathName={PathName} />
            : null
        }

        <Switch>

          <RestrictAccessRoute
            exact={true}
            path="/login"
            render={() => <LoginPage />}
            forAuth={false}
            auth={user?.googleId}
            to={'/'}
          />

          <RestrictAccessRoute
            exact={true}
            path="/"
            render={() => <HomePage />}
            forAuth={true}
            auth={user?.googleId}
            to={'/login'}
          />

          <RestrictAccessRoute
            exact={true}
            path="/roles"
            render={() => <RolesPage />}
            forAuth={true}
            auth={user?.googleId}
            to={'/login'}
          />

          <Route render={() => <HomePage />} />
        </Switch>

      </div>
    )

  }
);