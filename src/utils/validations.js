import * as moment from 'moment';

const empty = (value) => {
  const val = value ? value.toString().trim() : value || value === 0;
  return !val;
};

const minOf = (value, min) => {
    return !empty(value) && value.length >= min;
  };
  
const maxOf = (value, max) => {
   return !empty(value) && value.length < max;
};

const password = (value) => {
    const rePass = /^(?=(.*\d){3})(?=.*[A-Z])(?=.*[a-z])(?=.*[#!@$^&*_-]).{7,16}$/;
    return !empty(value) && value.length >= 8 && rePass.test(value);
  };

const email = (value) => {
  const re =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};

const loginPassword = (value) => {
  const regex = /(?=(.*\d){3})(?=(.*[a-z]){1})(?=(.*[A-Z]){1})/;
  return !empty(value) && value.length >= 8 && value.length <= 16 && regex.test(value);
};
const numericPhone = (value) => {
  const reNum = /^[0-9]*$/;
  return !empty(value) && value.length == 10 && reNum.test(value);
};


const date = (value) => {
  return moment(value).isValid();
};
const boolean = (value) => {
  if (typeof value === 'boolean') {
    return true;
  }
  if (value === true || value === false || value === 'true') {
    return true;
  }
  return false;
};
const description = (value) => {
  if (!value) {
    return false;
  }
  value = value.trim();
  return value.length >= 2 && value.length <= 200;
};

const Validation = {
  empty,
  minOf,
  boolean,
  maxOf,
  email,
  password,
  numericPhone,
  loginPassword,
  date,
  description
};

export default Validation;
