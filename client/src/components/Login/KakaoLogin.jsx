import { useDispatch } from 'react-redux';
import { kakaoLogin } from '@/store/creator/usersCreator';

import SocialBtn from '../elements/SocialBtn';

const { Kakao } = window;

export default function KakaoLogin() {
  const dispatch = useDispatch();

  const kakaoLoginClickHandler = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        // const accessToken = authObj.access_token;
        Kakao.API.request({
          url: '/v2/user/me',
          success: function (res) {
            const userData = {
              email: res.id,
              nickname: res.kakao_account.profile.nickname,
              emailauth: 2,
              src: res.kakao_account.profile.profile_image_url,
            };
            dispatch(kakaoLogin(userData));
          },
          fail: function (error) {
            alert('로그인은 성공했으나 해당 정보들을 불러오지 못했습니다: ' + JSON.stringify(error));
          },
        });
      },
      fail: function (err) {
        alert('로그인에 실패하였습니다: ' + JSON.stringify(err));
      },
    });
  };

  return (
    <div onClick={kakaoLoginClickHandler}>
      <SocialBtn type="kakao" />
    </div>
  );
}
