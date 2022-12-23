import axios from 'axios';
//const HOST = 'https://hrms.techsuperiors.com';
const HOST = 'http://13.232.215.173:9003'
const VERSION = '/api/';
const API = HOST + VERSION;

const instance = axios.create({
  baseURL: API,
});

export default instance;
