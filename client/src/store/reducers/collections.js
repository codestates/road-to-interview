import {
  addCollectionRequest,
  addCollectionSuccess,
  addCollectionFailure,
  getCollectionsRequest,
  getCollectionsSuccess,
  getCollectionsFailure,
} from '../actions/collectionsAction';

const initialState = {
  collections: [],
  addCollectionLoading: false,
  addCollectionDone: false,
  addCollectionError: null,
  getCollectionsLoading: false,
  getCollectionsDone: false,
  getCollectionsError: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case addCollectionRequest:
      return {
        ...state,
        addCollectionLoading: true,
        addCollectionDone: false,
        addCollectionError: null,
      };
    case addCollectionSuccess:
      return {
        ...state,
        collections: action.payload,
        addCollectionLoading: false,
        addCollectionDone: true,
        addCollectionError: null,
      };
    case addCollectionFailure:
      return {
        ...state,
        addCollectionLoading: false,
        addCollectionDone: false,
        addCollectionError: action.payload,
      };
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
        collections: action.payload.collections,
        getCollectionsLoading: false,
        getCollectionsDone: true,
        getCollectionsError: null,
      };
    case getCollectionsFailure:
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
