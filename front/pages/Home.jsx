import React from 'react';
import { Helmet } from 'react-helmet';

import HomeComponent from '../components/Home';

export default ({ }) => {

  return (
    <div>
      <Helmet><title>VMT - Главная</title></Helmet>
      <HomeComponent />
    </div>
  );

};