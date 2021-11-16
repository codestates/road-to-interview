import { getCategoryRequest, getCategorySuccess, getCategoryFailure } from '../actions/categoryAction';

const initialState = {
  categorys: [],
  getCategoryLoading: false,
  getCategoryDone: false,
  getCategoryError: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case getCategoryRequest:
      return {
        ...state,
        getCategoryLoading: true,
        getCategoryDone: false,
        getCategoryError: null,
      };
    case getCategorySuccess:
      return {
        ...state,
        categorys: action.payload,
        getCategoryLoading: false,
        getCategoryDone: true,
        getCategoryError: null,
      };
    case getCategoryFailure:
      return {
        ...state,
        getCategoryLoading: false,
        getCategoryDone: false,
        getCategoryError: action.payload,
      };
    default:
      return state;
  }
}
