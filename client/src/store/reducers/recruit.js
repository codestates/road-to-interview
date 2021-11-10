import { getRecruitRequest, getRecruitSuccess, getRecruitFailure } from '../actions/recruitAction';

const initialState = {
  recruit: [],
  getRecruitLoading: false,
  getRecruitDone: false,
  getRecruitError: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case getRecruitRequest:
      return {
        ...state,
        getRecruitLoading: true,
        getRecruitDone: false,
        getRecruitError: null,
      };
    case getRecruitSuccess:
      return {
        ...state,
        recruit: action.payload,
        getRecruitLoading: false,
        getRecruitDone: true,
        getRecruitError: null,
      };
    case getRecruitFailure:
      return {
        ...state,
        getRecruitLoading: false,
        getRecruitDone: false,
        getRecruitError: action.payload,
      };
    default:
      return state;
  }
}
