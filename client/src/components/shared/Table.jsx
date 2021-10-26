import { spacing } from '@/styles';
import styled from '@emotion/styled';

function Table({ children, className }) {
  return <Container className={className}>{children}</Container>;
}

const Container = styled.div`
  display: grid;
  min-height: 8rem;
  max-height: 17rem;
  grid-template-rows: minmax(min-content, 1fr) minmax(min-content, 3fr) min-content min-content;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: start;
  row-gap: 1em;
  padding-bottom: ${spacing[4]};
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor.inner};
`;

const Header = styled.div`
  grid-row: 1 / span 1;
  grid-column: 1 / span 3;
  align-self: end;
`;
const Body = styled.div`
  grid-row: 2 / span 1;
  grid-column: 1 / span 3;
  align-self: start;
`;
const FooterTop = styled.div`
  grid-row: 3 / span 1;
  grid-column: 1 / span 3;
  align-self: end;
`;
const FooterStart = styled.div`
  grid-row: 4 / span 1;
  grid-column: 1 / span 2;
`;
const FooterEnd = styled.div`
  grid-row: 4 / span 1;
  grid-column: 3 / span 1;
  justify-self: end;
`;

Table.Header = Header;
Table.Body = Body;
Table.FooterTop = FooterTop;
Table.FooterStart = FooterStart;
Table.FooterEnd = FooterEnd;

export default Table;
