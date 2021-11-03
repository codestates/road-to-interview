import { combineReducers } from 'redux';
import users from './users';
import interviews from './interviews';
import categorys from './categorys';
import questions from './questions';
import collections from './collections';

const rootReducer = combineReducers({
  users,
  interviews,
  categorys,
  questions,
  collections,
});

export default rootReducer;
