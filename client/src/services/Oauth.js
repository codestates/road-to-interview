import axios from 'axios';

export default class Oauth {
  async getKakaoLogin() {
    const code = await axios.get(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=http://localhost:3000/login&response_type=code`,
    );
    return code;
  }
}
