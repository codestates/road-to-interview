import { INTERVIEW_API } from '@/services';

import {
  getInterviewsRequest,
  getInterviewsSuccess,
  getInterviewsFailure,
  createInterviewRequest,
  createInterviewSuccess,
  createInterviewFailure,
} from '../actions/interviewsAction';

// 인터뷰 리스트 가져오기
export const getInterviews = (page, size) => async dispatch => {
  try {
    dispatch({ type: getInterviewsRequest });
    const data = await INTERVIEW_API.getInterviews(page, size);
    dispatch({ type: getInterviewsSuccess, payload: data });
  } catch (e) {
    dispatch({ type: getInterviewsFailure, payload: e.message });
  }
};

// 인터뷰 생성하기
export const createInterview = data => async dispatch => {
  try {
    dispatch({ type: createInterviewRequest });
    await INTERVIEW_API.createInterview(data);
    dispatch({ type: createInterviewSuccess });
  } catch (e) {
    dispatch({ type: createInterviewFailure, payload: e.message });
  }
};
