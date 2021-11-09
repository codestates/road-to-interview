import { COLLECTIONS_API } from '@/services';

import {
  addCollectionRequest,
  addCollectionSuccess,
  addCollectionFailure,
  getCollectionsRequest,
  getCollectionsSuccess,
  getCollectionsFailure,
  deleteCollectionsRequest,
  deleteCollectionsSuccess,
  deleteCollectionsFailure,
} from '../actions/collectionsAction';

// 컬렉션 추가하기
export const addCollections = data => async dispatch => {
  const { accessToken, interviews_id } = data;
  try {
    dispatch({ type: addCollectionRequest });
    const data = COLLECTIONS_API.addCollections(accessToken, interviews_id);
    dispatch({ type: addCollectionSuccess, payload: data });
  } catch (e) {
    dispatch({ type: addCollectionFailure, payload: e.message });
  }
};

// 내 컬렉션 가져오기
export const getCollections = accessToken => async dispatch => {
  try {
    // 로딩
    dispatch({ type: getCollectionsRequest });
    // 성공
    const data = await COLLECTIONS_API.getCollections(accessToken);
    dispatch({ type: getCollectionsSuccess, payload: data });
  } catch (e) {
    // 실패
    dispatch({ type: getCollectionsFailure, payload: e.message });
  }
};

// 컬렉션 삭제하기
export const deleteCollections = data => async dispatch => {
  const { accessToken, interviews_id } = data;
  try {
    dispatch({ type: deleteCollectionsRequest });
    const data = await COLLECTIONS_API.deleteCollections(accessToken, interviews_id);
    dispatch({ type: deleteCollectionsSuccess, payload: data });
  } catch (e) {
    dispatch({ type: deleteCollectionsFailure, payload: e.message });
  }
};
