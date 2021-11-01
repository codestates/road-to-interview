import { combineReducers } from 'redux';
import users from './users';
import interviews from './interviews';
import categorys from './categorys';

const rootReducer = combineReducers({
  users,
  interviews,
  categorys,
});

export default rootReducer;
