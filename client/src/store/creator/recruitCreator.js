import { RECRUIT_API } from '@/services';
import { getRecruitRequest, getRecruitSuccess, getRecruitFailure } from '../actions/recruitAction';

// 구직데이터 가져오기
export const getRecruit = () => async dispatch => {
  try {
    // 로딩
    dispatch({ type: getRecruitRequest });
    const data = await RECRUIT_API.getRecruit(); // 10초
    // 성공
    dispatch({ type: getRecruitSuccess, payload: data });
  } catch (e) {
    // 실패
    dispatch({ type: getRecruitFailure, payload: e.response?.data?.message });
  }
};
