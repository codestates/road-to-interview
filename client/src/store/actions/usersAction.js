// * Action Type

// 로그인 요청
export const loginRequest = 'users/login/pending';
export const loginSuccess = 'users/login/fullfilled';
export const loginFailure = 'users/login/rejected';
// 로그아웃 요청
export const logoutRequest = 'users/logout/pending';
export const logoutSuccess = 'users/logout/fullfilled';
export const logoutFailure = 'users/logout/rejected';
// 회원가입 요청
export const signupRequest = 'users/signup/pending';
export const signupSuccess = 'users/signup/fullfilled';
export const signupFailure = 'users/signup/rejected';
// 권한 인증
export const authRequest = 'users/auth/pending';
export const authSuccess = 'users/auth/fullfilled';
export const authFailure = 'users/auth/rejected';
// 정보수정 요청
export const editRequest = 'users/edit/pending';
export const editSuccess = 'users/edit/fulfilled';
export const editFailure = 'users/edit/rejected';
