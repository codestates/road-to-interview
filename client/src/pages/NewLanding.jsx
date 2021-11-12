import styled from '@emotion/styled';
import Nav from '@/components/shared/Nav';
import Main from '@/components/NewLanding/Main';
import Info from '@/components/NewLanding/Info';
import { infoObjs } from '@/constants/NewLanding/InfoData';
import Footer from '@/components/shared/Footer';
import { QnAData } from '@/constants/Landing';
import Divider from '@/components/Landing/Divider';
import Tabs from '@/components/Landing/Tab2';

export default function NewLanding() {
  return (
    <div>
      <Nav />
      <Main />
      {infoObjs.map(info => (
        <Info {...info} />
      ))}
      <Section>
        <Divider title="q&a" />
        <Tabs>
          {QnAData.map(data => (
            <Tabs.Tab {...data} />
          ))}
        </Tabs>
      </Section>
      <Footer />
    </div>
  );
}

// * Sections

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1024px;
  min-height: 100vh;
  margin: 0 auto;
`;
