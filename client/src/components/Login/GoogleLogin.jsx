import { useDispatch } from 'react-redux';
import { googleLogin } from '@/store/creator/usersCreator';
import GoogleLogin from 'react-google-login';
import { useMode } from '@/contexts/ModeContext';
import { spacing } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export default function GoogleSocialLogin() {
  const [mode] = useMode();
  const dispatch = useDispatch();

  const responseGoogle = res => {
    const { email, name, imageUrl } = res?.profileObj;
    const userData = {
      email,
      nickname: name,
      emailauth: 3,
      src: imageUrl,
    };
    console.log(userData);
    dispatch(googleLogin(userData));
  };

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      render={renderProps => (
        <div
          css={css`
            width: 100%;
          `}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <Google mode={mode}>
            <img
              css={css`
                width: 2.2rem;
                border-radius: 2px;
              `}
              src="/images/googleicon.png"
              alt="google"
            />
            <GoogleText>구글로 시작하기</GoogleText>
          </Google>
        </div>
      )}
      buttonText="구글로 시작하기"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}

const Google = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.625rem;
  color: ${({ mode, theme }) => (mode === 'dark' ? `${theme.colors.text.primary}` : 'rgba(0, 0, 0, 0.54)')};
  background-color: ${({ mode }) => (mode === 'dark' ? '#4285F4' : '#FFFFFF')};
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 2px 3px 3px ${({ theme }) => theme.colors.shadow.basic};
`;
const GoogleText = styled.span`
  padding: 0 ${spacing[3]};
  font-weight: 600;
`;
