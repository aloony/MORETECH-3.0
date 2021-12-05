import React from 'react';

import { connect } from 'react-redux';

import DataCatalogComponent from '../DataCatalog'
import ProcessDatasetsComponent from '../ProcessDatasets'

export default connect((s) => ({
  datahubMenu: s.datahub.menu,
}), {

})(
  ({
    datahubMenu,
  }) => {

    return (
      <section className="content">
        {
          datahubMenu == 'catalog'
            ? <DataCatalogComponent />
            : <ProcessDatasetsComponent />
        }
      </section >
    )

  }
);