import { QUESTIONS_API } from '@/services';

import { getQuestionsRequest, getQuestionsSuccess, getQuestionsFailure } from '../actions/questionAction';

// 질문 가져오기
export const getQuestions = interviewsId => async dispatch => {
  try {
    // 로딩
    dispatch({ type: getQuestionsRequest });
    const data = await QUESTIONS_API.getQuestions(interviewsId); // 10초
    // 성공
    dispatch({ type: getQuestionsSuccess, payload: data });
  } catch (e) {
    // 실패
    dispatch({ type: getQuestionsFailure, payload: e.response?.data?.message });
  }
};
