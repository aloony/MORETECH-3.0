import axios from 'axios';
import { baseUrl } from '../config';

axios.defaults.withCredentials = true;

export default class UserApi {
  static getCurrentAccountInfo = () => axios.get(`${baseUrl}users/current`);
  static searchUserByEmail = (search) => axios.get(`${baseUrl}users/search?search=${search}`);
}