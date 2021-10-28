import styled from '@emotion/styled';
import { useMode } from '@/contexts/ModeContext';
import { ReactComponent as Moon } from 'assets/moon.svg';
import { ReactComponent as Sun } from 'assets/sun.svg';

export default function ToggleBtn({ className }) {
  const [mode, toggleMode] = useMode();
  return (
    <Button className={className} onClick={toggleMode}>
      {mode === 'dark' ? <Sun width="2rem" height="2rem" /> : <Moon width="2rem" height="2rem" />}
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  color: inherit;
`;
