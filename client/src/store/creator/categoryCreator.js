import { CATEGORY_API } from '@/services';
import { getCategoryRequest, getCategorySuccess, getCategoryFailure } from '../actions/categoryAction';
import { showNotification } from '../creator/notificationsCreator';
export const getCategory = async dispatch => {
  try {
    dispatch({ type: getCategoryRequest });
    const data = await CATEGORY_API.getCategory();
    dispatch({ type: getCategorySuccess, payload: data });
  } catch (e) {
    dispatch({ type: getCategoryFailure, payload: e.response?.data?.message });
    dispatch(showNotification(`에러가 발생했습니다. 다시 시도해주세요!`, 'error'));
  }
};
