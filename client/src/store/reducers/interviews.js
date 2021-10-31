import {
  getInterviewsRequest,
  getInterviewsSuccess,
  getInterviewsFailure,
  createInterviewRequest,
  createInterviewSuccess,
  createInterviewFailure,
} from '../actions/interviewsAction';

const initialState = {
  // 인터뷰 리스트 데이터
  interviews: [],
  // 인터뷰 리스트 요청
  getInterviewsLoading: false,
  getInterviewsDone: false,
  getInterviewsError: null,
  // 인터뷰 생성 요청
  createInterviewsLoading: false,
  createInterviewsDone: false,
  createInterviewsError: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case getInterviewsRequest:
      return {
        ...state,
        getInterviewsLoading: true,
        getInterviewsDone: false,
        getInterviewsError: null,
      };
    case getInterviewsSuccess:
      return {
        ...state,
        interviews: action.payload,
        getInterviewsLoading: false,
        getInterviewsDone: true,
        getInterviewsError: null,
      };
    case getInterviewsFailure:
      return {
        ...state,
        getInterviewsLoading: false,
        getInterviewsDone: false,
        getInterviewsError: action.payload,
      };
    case createInterviewRequest:
      return {
        ...state,
        createInterviewsLoading: true,
        createInterviewsDone: false,
        createInterviewsError: null,
      };
    case createInterviewSuccess:
      return {
        ...state,
        createInterviewsLoading: false,
        createInterviewsDone: true,
        createInterviewsError: null,
      };
    case createInterviewFailure:
      return {
        ...state,
        createInterviewsLoading: false,
        createInterviewsDone: false,
        createInterviewsError: action.payload,
      };
    default:
      return state;
  }
}
