import 'bootstrap-daterangepicker/daterangepicker.css';
import React, { useEffect, useState } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { parseDate } from '../../common/utils';

import { changeMenu, changeSettings, sendCreatedatasetTask, clearSendTaskState } from '../../store/actions/datahub.actions'
import RolesSelectComponent from '../RolesSelect';
import RulesSelect from '../RulesSelect';

export default connect((s) => ({
  datahub: s.datahub,
  ownRoles: s.roles.state,
}), {
  changeMenu,
  changeSettings,
  sendCreatedatasetTask,
  clearSendTaskState
})(
  ({
    datahub,
    ownRoles,

    changeMenu,
    changeSettings,
    sendCreatedatasetTask,
    clearSendTaskState
  }) => {
    const [Search, changeSearch] = useState('')

    const getFieldsNames = () => {

      let names = []

      for (let i = 0; i < datahub.datasets.picked.length; i++)
        names = [...names, ...datahub.datasets.picked[i].fields.map(v => v.fieldPath)]

      return names.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    }

    const sendTask = () => sendCreatedatasetTask({
      ...datahub.settings,
      datasets: datahub.datasets.all
    })

    useEffect(() => {

      if (datahub.taskSended) {
        toast.success('Задача успешно отправлена на сервер', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        clearSendTaskState(false)
        changeMenu({ menu: 'catalog' })
      }

    }, [datahub.taskSended])

    return (
      <div className="">
        <div className="block-header">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <h2>Обработка наборов данных</h2>
              <div className="w-100 mt-2">
              </div>
              <span className={'cursor-pointer'}> </span>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 d-flex">
              <div className="flex-grow-1 d-flex align-items-center">
                <span><strong>Выбрано датасетов: {datahub.datasets.picked.length}</strong></span>
              </div>
              <button className="btn btn-primary flex-grow-1" onClick={() => changeMenu({ menu: 'catalog' })}>
                <span className={'text-white'}>Назад</span>
              </button>
              <button className="btn btn-primary flex-grow-1" onClick={sendTask}>
                <span className={'text-white'}>Отправить</span>
              </button>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-12 row">
              <div className="col-lg-6 col-md-12 row">

                <div className="col-lg-6 col-md-12">
                  <DateRangePicker
                    initialSettings={{ startDate: new Date(datahub.settings.dateFrom), endDate: new Date(datahub.settings.dateTo) }}
                    onApply={(event, { startDate, endDate }) => {
                      changeSettings({ name: 'dateFrom', value: startDate.toDate() })
                      changeSettings({ name: 'dateTo', value: endDate.toDate() })
                    }}
                  >
                    <div>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="">Дата</span>
                        </div>
                        <input type="text" className="form-control" readOnly value={parseDate(datahub.settings.dateFrom)} />
                        <input type="text" className="form-control" readOnly value={parseDate(datahub.settings.dateTo)} />
                      </div>
                    </div>
                  </DateRangePicker>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="">Количество строк</span>
                    </div>
                    <input type="text" required value={datahub.settings.rowsCount} onChange={e => changeSettings({ name: 'rowsCount', value: parseInt(e.target.value) | 0 })} className="form-control d-inline-block m-0" />
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="">Цена</span>
                    </div>
                    <input type="text" required value={datahub.settings.price} onChange={e => changeSettings({ name: 'price', value: parseInt(e.target.value) | 0 })} className="form-control d-inline-block m-0" />
                  </div>
                </div>

                <div className="col-lg-6 col-md-12 d-flex align-items-center">
                  <span>Приватный?</span>
                  <div className="flex-grow-1">
                    <label className="switch m-0 ">
                      <input type="checkbox" className="primary" checked={datahub.settings.isPrivate} onChange={(e) => changeSettings({ name: 'isPrivate', value: e.target.checked })} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>

              </div>

              <div className="col-lg-6 col-md-12">
                <RolesSelectComponent
                  search={Search}
                  changeSearch={changeSearch}
                  values={ownRoles}
                  roles={datahub.settings.roles}
                  changeRoles={(roles) => changeSettings({ name: 'roles', value: roles })}
                />
              </div>

            </div>

            <div className="col-12">

              <h2 className={'mt-3 mb-1'}>Правила и фичи</h2>

              <RulesSelect
                rules={datahub.settings.rules}
                changeRules={(rules) => changeSettings({ name: 'rules', value: rules })}
              />

              <div className="w-100 mt-2 mb-2">
                <span>Примеры:</span>
                <span className={'ml-2 text-success'}>$field_foo - $field_bar = $age</span>,
                <span className={'ml-2 text-warning'}>del $timestamp</span>,
                <span className={'ml-2 text-danger'}>rn $browser_id = $new_browser_id</span>

              </div>

              <table className="table d-inline-block overflow-x-scroll">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>schema</th>
                    {
                      getFieldsNames().map((v, i) => (
                        <th key={i}>{v}</th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    datahub.datasets.picked.map((v, i) => (
                      <tr key={i}>
                        <td className={'text-center'}>{i + 1}</td>
                        <td className={'text-center'}>{v.name}</td>
                        {
                          getFieldsNames().map((fv, fi) => (
                            <td key={fi} className={'text-center'}>{v.fields.find(v => v.fieldPath == fv) ? v.fields.find(v => v.fieldPath == fv).type : '-'}</td>
                          ))
                        }
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    )

  }
);