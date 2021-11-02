import { combineReducers } from 'redux';
import users from './users';
import interviews from './interviews';
import categorys from './categorys';
import questions from './questions';

const rootReducer = combineReducers({
  users,
  interviews,
  categorys,
  questions,
});

export default rootReducer;
