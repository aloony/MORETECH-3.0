import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { changeDataCatalogPath, pickDataSet, changeMenu, clearPickedDatasets } from '../../store/actions/datahub.actions'

export default connect((s) => ({
  datahub: s.datahub,
}), {
  changeDataCatalogPath,
  pickDataSet,
  changeMenu,
  clearPickedDatasets
})(
  ({
    datahub,

    changeDataCatalogPath,
    pickDataSet,
    changeMenu,
    clearPickedDatasets
  }) => {
    const [DataCatalog, changeDataCatalog] = useState([])

    const changeCurrentPath = (path) => changeDataCatalogPath({ path })

    const toggleDataset = (urn) => changeDataCatalog(DataCatalog.map(v => v.urn == urn ? ({ ...v, show: !v.show }) : v))

    const isPicked = (urn) => datahub.datasets.picked.find(v => v.urn == urn) ? true : false

    const nextStep = () => {

      console.log(datahub.datasets.picked.length)

      if (datahub.datasets.picked.length > 0)
        changeMenu({ menu: 'proccess' })
      else
        toast.warning('Выбирите хотя бы один датасет', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

    }

    useEffect(() => {

      let currentData = null
      let path = datahub.dataCatalog.path.split('/').filter(Boolean)

      if (datahub.dataCatalog.path)
        for (let i = 0; i < path.length; i++)
          if (datahub.datasets.all.find(v => v.folder + '/' == datahub.dataCatalog.path))
            currentData = datahub.datasets.all.filter(v => v.folder + '/' == datahub.dataCatalog.path).map(v => ({ ...v, isFolder: false, show: false }))
          else
            currentData = datahub.dataCatalog.all.find(v => v.name == path[i]).children.map(v => ({ name: v.name, isFolder: true }))
      else
        currentData = datahub.dataCatalog.all.map(v => ({ name: v.name, isFolder: true }))

      changeDataCatalog(currentData);

    }, [datahub.dataCatalog.path])

    return (
      <div className="">
        <div className="block-header">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <h2>Каталог данных</h2>
              <div className="w-100 mt-2">
                <span onClick={() => changeCurrentPath('')} className={'cursor-pointer'}>Datasets </span>
                {
                  datahub.dataCatalog.path.split('/').map((v, i, a) => (
                    <span key={i} onClick={() => changeCurrentPath(a.slice(0, i + 1).join('/') + '/')} className={'cursor-pointer'}>/ <span>{v}</span> </span>
                  ))
                }
              </div>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 d-flex">
              <div className="flex-grow-1 d-flex align-items-center">
                <span><strong>Выбрано датасетов: {datahub.datasets.picked.length}</strong></span>
              </div>
              <button className="btn btn-primary flex-grow-1" onClick={() => clearPickedDatasets()}>
                <span className={'text-white'}>Очистить</span>
              </button>
              <button className="btn btn-primary flex-grow-1" onClick={() => nextStep()}>
                <span className={'text-white'}>Продолжить</span>
              </button>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-12">
              {
                DataCatalog.map((v, i) =>
                  v.isFolder
                    ? (
                      <div onClick={() => changeCurrentPath(datahub.dataCatalog.path + `${v.name}/`)} key={i} className="w-100 cursor-pointer mt-2 mb-2 mr-3 ml-3 p-3 border border-black rounded">
                        <i className="zmdi zmdi-folder-outline mr-3"></i>
                        <span>{v.name}</span>
                      </div>
                    )
                    : (
                      <div className="card mt-2 mb-2 mr-3 ml-3" key={i}>
                        <div className="card-header bg-transparent border border-black rounded p-3">
                          <i className="zmdi zmdi-file mr-3"></i>
                          <span className={'cursor-pointer'} onClick={() => toggleDataset(v.urn)}>{v.name}</span>
                          <div className="float-right">
                            <label className="switch m-0">
                              <input type="checkbox" className="primary" checked={isPicked(v.urn)} onChange={() => pickDataSet({ urn: v.urn })} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                        <div className={v.show ? "collapse show border-left border-right border-bottom" : "collapse"}>
                          <div className="card-body p-3 pt-1 pb-2">
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Название поля</th>
                                  <th>Тип поля</th>
                                  <th>Описание</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  v.fields.map((fv, i) => (
                                    <tr key={i}>
                                      <th scope="row">{i + 1}</th>
                                      <td>{fv.fieldPath}</td>
                                      <td>{fv.type}</td>
                                      <td>{fv.description}</td>
                                    </tr>
                                  ))
                                }
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))
              }
            </div>
          </div>
        </div>
      </div>
    )

  }
);