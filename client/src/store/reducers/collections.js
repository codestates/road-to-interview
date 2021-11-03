import { getCategoryFailure } from '../actions/categoryAction';
import { getCollectionsRequest, getCollectionsSuccess, getCollectionsFailure } from '../actions/collectionsAction';

const initialState = {
  collections: [],
  getCollectionsLoading: false,
  getCollectionsDone: false,
  getCollectionsError: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case getCollectionsRequest:
      return {
        ...state,
        getCollectionsLoading: true,
        getCollectionsDone: false,
        getCollectionsError: null,
      };
    case getCollectionsSuccess:
      return {
        ...state,
        collections: action.payload,
        getCollectionsLoading: true,
        getCollectionsDone: false,
        getCollectionsError: null,
      };
    case getCategoryFailure:
      return {
        ...state,
        getCollectionsLoading: false,
        getCollectionsDone: false,
        getCollectionsError: action.payload,
      };
    default:
      return state;
  }
}
