import styled from '@emotion/styled';
import { useMode } from '@/contexts/ModeContext';
import { ReactComponent as Moon } from 'assets/moon.svg';
import { ReactComponent as Sun } from 'assets/sun.svg';
import { spacing } from '@/styles';

export default function ToggleBtn({ className }) {
  const [mode, toggleMode] = useMode();
  return (
    <Button className={className} onClick={toggleMode}>
      {mode === 'dark' ? <Sun width="1.5rem" height="1.5rem" /> : <Moon width="1.5rem" height="1.5rem" />}
    </Button>
  );
}

const Button = styled.button`
  height: 100%;
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  color: inherit;
`;
