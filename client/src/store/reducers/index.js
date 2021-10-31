import { combineReducers } from 'redux';
import users from './users';
import interviews from './interviews';

const rootReducer = combineReducers({
  users,
  interviews,
});

export default rootReducer;
