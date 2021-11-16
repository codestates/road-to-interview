import { RECRUIT_API } from '@/services';
import { getRecruitRequest, getRecruitSuccess, getRecruitFailure } from '../actions/recruitAction';
import { showNotification } from '../creator/notificationsCreator';
// 구직데이터 가져오기
export const getRecruit = () => async dispatch => {
  try {
    // 로딩
    dispatch({ type: getRecruitRequest });
    const data = await RECRUIT_API.getRecruit();
    // 성공
    dispatch({ type: getRecruitSuccess, payload: data });
    dispatch(showNotification(`매일 20개의 기업에 도전하세요 🎊`));
  } catch (e) {
    // 실패
    dispatch({ type: getRecruitFailure, payload: e.response?.data?.message });
    dispatch(showNotification(`에러가 발생했습니다. 다시 시도해주세요!`, 'error'));
  }
};
