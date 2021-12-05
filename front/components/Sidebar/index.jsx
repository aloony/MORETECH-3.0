import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { baseUrl } from '../../common/config';

const cookies = new Cookies();

export default connect((s) => ({
  user: s.user.state,

}), {

})(
  ({
    PathName,
    user,
  }) => {
    const [SidebarIsOpen, changeSidebarIsOpen] = useState(cookies.get('SidebarIsOpen') == 'true' ? true : false)

    const toggleSidebar = () => {
      changeSidebarIsOpen(!SidebarIsOpen)
      cookies.set('SidebarIsOpen', !SidebarIsOpen)
    }

    useEffect(() => {

      if (SidebarIsOpen) {

        let themeBlush = document.getElementsByClassName('theme-blush')[0]

        if (themeBlush)
          themeBlush.classList.remove('ls-toggle-menu')

      } else {

        let themeBlush = document.getElementsByClassName('theme-blush')[0]

        if (themeBlush)
          themeBlush.classList.add('ls-toggle-menu')

      }

    }, [SidebarIsOpen])

    return (
      <aside id="leftsidebar" className="sidebar">
        <div className="navbar-brand">
          <button onClick={toggleSidebar} className="btn-menu ls-toggle-btn" type="button"><i className="zmdi zmdi-menu"></i></button>
          <Link to={'/'}><span className="m-l-10">VMT</span></Link>
        </div>
        <div className="menu">
          <ul className="list">
            <li>
              <div className="user-info" style={{ display: "grid" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Link className="image" to={'/profile'}>
                    <img src={user.avatar} alt="User" />
                  </Link>
                  <div className="detail" style={{ textAlign: "left" }}>
                    <h6>{user.displayName}</h6>
                    <a style={{ marginLeft: "2px", padding: 0, fontSize: "small" }} href={`${baseUrl}users/logout`} className="waves-effect waves-block">Log Out</a >
                  </div>
                </div>
              </div>
            </li>
            <li className={PathName == '/' ? 'active open' : ''}>
              <Link to={'/'}>
                <i className="zmdi zmdi-home"></i>
                <span>Главная</span>
              </Link>
            </li>
            <li className={PathName == '/roles' ? 'active open' : ''}>
              <Link to={'/roles'}>
                <i className="zmdi zmdi-account-o"></i>
                <span>Роли</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside >
    )

  }
);

