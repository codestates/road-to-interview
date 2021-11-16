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
        ...state,
        getQuestionsLoading: true,
        getQuestionsDone: false,
        getQuestionsError: null,
      };
    case getQuestionsSuccess:
      return {
        ...state,
        questions: action.payload,
        getQuestionsLoading: false,
        getQuestionsDone: true,
        getQuestionsError: null,
      };
    case getQuestionsFailure:
      return {
        ...state,
        getQuestionsLoading: false,
        getQuestionsDone: false,
        getQuestionsError: action.payload,
      };
    default:
      return state;
  }
}
