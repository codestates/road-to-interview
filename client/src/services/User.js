export default class User {
  constructor(client) {
    this.client = client;
  }

  // 로그인
  async postLogin(payload) {
    const response = await this.client.post('/login', payload);
    return response.data;
  }

  // 회원가입
  async postSignup(payload) {
    const response = await this.client.post('/signup', payload);
    return response.data;
  }

  // 로그아웃
  async getLogout(accessToken) {
    const response = await this.client.get('/logout', {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  }

  // 유저 권한 인증 (refresh token)
  async getAuth(accessToken) {
    const response = await this.client.get('/users', {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  }

  // 유저 정보 수정
  async putUserInfo(accessToken, payload) {
    const response = await this.client.put('/users', {
      headers: {
        Authorization: `${accessToken}`,
      },
      data: {
        payload,
      },
    });
    return response.data;
  }
}
