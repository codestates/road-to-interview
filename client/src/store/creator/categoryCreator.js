import { CATEGORY_API } from '@/services';
import { getCategoryRequest, getCategorySuccess, getCategoryFailure } from '../actions/categoryAction';

export const getCategory = async dispatch => {
  try {
    dispatch({ type: getCategoryRequest });
    const data = await CATEGORY_API.getCategory();
    dispatch({ type: getCategorySuccess, payload: data });
  } catch (e) {
    dispatch({ type: getCategoryFailure, payload: e.response?.data?.message });
  }
};
