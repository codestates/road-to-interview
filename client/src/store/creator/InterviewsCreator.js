import { INTERVIEW_API } from '@/services';

import {
  getInterviewsRequest,
  getInterviewsSuccess,
  getInterviewsFailure,
  createInterviewRequest,
  createInterviewSuccess,
  createInterviewFailure,
} from '../actions/interviewsAction';

import { showNotification } from '../creator/notificationsCreator';

// 인터뷰 리스트 가져오기
export const getInterviews =
  ({ page, size, category }) =>
  async dispatch => {
    try {
      dispatch({ type: getInterviewsRequest });
      const data = await INTERVIEW_API.getInterviews(page, size, category);
      dispatch({ type: getInterviewsSuccess, payload: data });
    } catch (e) {
      dispatch({ type: getInterviewsFailure, payload: e.response?.data?.message });
      dispatch(showNotification(`에러가 발생했습니다. 다시 시도해주세요!`, 'error'));
    }
  };

// 인터뷰 생성하기
export const createInterview =
  ({ payload, accessToken }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: createInterviewRequest });
      const res = await INTERVIEW_API.createInterview(payload, accessToken);
      dispatch({ type: createInterviewSuccess });
      dispatch(showNotification(`${res.title} 가 생성 완료되었습니다! 🔖`));
    } catch (e) {
      dispatch({ type: createInterviewFailure, payload: e.response?.data?.message });
      dispatch(showNotification(`에러가 발생했습니다. 다시 시도해주세요!`, 'error'));
    }
  };
