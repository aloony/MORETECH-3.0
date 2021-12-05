import axios from 'axios';
import { baseUrl } from '../config';

axios.defaults.withCredentials = true;

export default class UserApi {
  static getDatahub = () => axios.get(`${baseUrl}datahub/`);
  static addNewTask = (data) => axios.post(`${baseUrl}datahub/add-task`, data);
}