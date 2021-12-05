import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import BuilderComponent from '../components/Builder';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.builder}</title></Helmet>
      <BuilderComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};