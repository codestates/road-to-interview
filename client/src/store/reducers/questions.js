import { getQuestionsRequest, getQuestionsSuccess, getQuestionsFailure } from '../actions/questionAction';

const initialState = {
  questions: [],
  getQuestionsLoading: false,
  getQuestionsDone: false,
  getQuestionsError: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case getQuestionsRequest:
      return {
        getQuestionsLoading: true,
        getQuestionsDone: false,
        getQuestionsError: null,
        ...state,
      };
    case getQuestionsSuccess:
      return {
        questions: action.payload,
        getQuestionsLoading: false,
        getQuestionsDone: true,
        getQuestionsError: null,
        ...state,
      };
    case getQuestionsFailure:
      return {
        getQuestionsLoading: false,
        getQuestionsDone: false,
        getQuestionsError: action.payload,
        ...state,
      };
    default:
      return state;
  }
}
