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
  async getLogout() {
    const response = await this.client.get('/logout');
    return response.data;
  }

  // 유저 권한 인증 (refresh token)
  async getAuth() {
    const response = await this.client.get('/users');
    return response.data;
  }
}
