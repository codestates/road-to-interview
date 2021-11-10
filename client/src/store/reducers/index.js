import { combineReducers } from 'redux';
import users from './users';
import interviews from './interviews';
import categorys from './categorys';
import questions from './questions';
import collections from './collections';
import notifications from './notifications';

const rootReducer = combineReducers({
  users,
  interviews,
  categorys,
  questions,
  collections,
  notifications,
});

export default rootReducer;
