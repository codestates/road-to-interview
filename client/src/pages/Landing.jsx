import styled from '@emotion/styled';

import Main from '@/components/NewLanding/Main';
import Info from '@/components/NewLanding/Info';
import { infoObjs } from '@/constants/NewLanding/InfoData';

export default function NewLanding() {
  return (
    <LandingContainer>
      <Main />
      {infoObjs.map(info => (
        <Info {...info} />
      ))}
    </LandingContainer>
  );
}
const LandingContainer = styled.div``;
// * Sections
