import axios from 'axios';
import { baseUrl } from '../config';

axios.defaults.withCredentials = true;

export default class UserApi {
  static getUserOwnRoles = () => axios.get(`${baseUrl}roles/`);
  static createOwnRole = (data) => axios.post(`${baseUrl}roles/`, data);
  static EditOwnRole = (data) => axios.post(`${baseUrl}roles/edit`, data);
  static deleteOwnRole = (data) => axios.post(`${baseUrl}roles/delete`, data);
}