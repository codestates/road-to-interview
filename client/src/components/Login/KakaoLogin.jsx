import SocialBtn from '../elements/SocialBtn';

const { Kakao } = window;
const loginWithKakao = () => {
  Kakao.Auth.authorize({
    redirectUri: 'http://localhost:3000/login',
  });
};

export default function KakaoLogin() {
  return (
    <div onClick={loginWithKakao}>
      <SocialBtn type="kakao" />
    </div>
  );
}
