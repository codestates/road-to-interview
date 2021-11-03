import { COLLECTIONS_API } from '@/services';

import { getCollectionsRequest, getCollectionsSuccess, getCollectionsFailure } from '../actions/collectionsAction';

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
