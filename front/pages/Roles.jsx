import React from 'react';
import { Helmet } from 'react-helmet';

import RolesComponent from '../components/Roles';

export default ({ }) => {

  return (
    <div>
      <Helmet><title>VMT - Роли</title></Helmet>
      <RolesComponent />
    </div>
  );

};