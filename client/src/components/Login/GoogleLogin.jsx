import SocialBtn from '../elements/SocialBtn';
import { GoogleLogin } from 'react-google-login';

export default function GoogleSocialLogin() {
  const onclickLoginGoogle = res => {
    console.log(res);
  };
  return (
    <div>
      <GoogleLogin
        clientId={`${process.env.GOOGLE_CLIENT_ID}`}
        render={renderProps => (
          <SocialBtn type="google" onClick={renderProps.onClick} disabled={renderProps.disabled} />
        )}
        buttonText="Login"
        onSuccess={onclickLoginGoogle}
        onFailure={onclickLoginGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}
