import { combineReducers } from 'redux';
import user from '../reducers/mainPage';
import ticketManagement from '../reducers/ticketManagement'
import ticketsList from '../reducers/ticketManagement'
import dsr from '../reducers/dsr'
import attendance from '../reducers/attendance'

const appReducer = combineReducers({
  user,
  ticketManagement,
  ticketsList,
  dsr,
  attendance
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;
