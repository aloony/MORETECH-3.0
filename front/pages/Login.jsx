import React from 'react';
import { Helmet } from 'react-helmet';

import LoginComponent from '../components/Login';

export default ({ }) => {

  return (
    <div>
      <Helmet><title>VMT - Авторизация</title></Helmet>
      <LoginComponent />
    </div>
  );

};