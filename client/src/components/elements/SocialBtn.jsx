import { useMode } from '@/contexts/ModeContext';
import { spacing } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const GOOGLE = 'google';
const KAKAO = 'kakao';

export default function SocialBtn({ type }) {
  const [mode] = useMode();
  switch (type) {
    case GOOGLE:
      return (
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
      );
    case KAKAO:
      return (
        <KaKao>
          <img
            css={css`
              width: 2rem;
              margin-left: 0.15rem;
            `}
            src="/images/kakaoicon.png"
            alt="kakao"
          />
          <KaKaoText>카카오로 시작하기</KaKaoText>
        </KaKao>
      );
    default:
      return null;
  }
}

const KaKao = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.625rem;
  background-color: #fee500;
  color: rgba(0, 0, 0, 0.85);
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 2px 3px 3px ${({ theme }) => theme.colors.shadow.basic};
`;
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
const KaKaoText = styled.span`
  padding: 0 ${spacing[3]};
  font-weight: 600;
`;
const GoogleText = styled.span`
  padding: 0 ${spacing[3]};
  font-weight: 600;
`;
