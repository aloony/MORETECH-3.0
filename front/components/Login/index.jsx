import React from 'react';
import { baseUrl } from '../../common/config';

import logoIMG from './../../img/logo.png'
import signinIMG from './../../img/signin.png'

export default ({ }) => {

  return (
    <div className="authentication">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-sm-12 d-flex align-items-center">
            <div className="card auth_form">
              <div className="header">
                <img className="logo" src={logoIMG} alt="" />
                <h5>Авторизация</h5>
                <span>Войти в аккаунт</span>
              </div>
              <div className="body">
                <a href={`${baseUrl}users/login`} className="btn btn-primary btn-block waves-effect waves-light">
                  <span className={'text-white'}><i className="zmdi zmdi-google"></i> Войти через Google</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-sm-12">
            <div className="card">
              <img src={signinIMG} alt="Sign In" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}