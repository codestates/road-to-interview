import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const Mode = createContext();

export default function ModeContext({ children }) {
  const getInitialTheme = useMemo(() => {
    // 로컬스토리지 값 가져오기
    let localValue = window.localStorage.getItem('mode');
    // 값이 없거나, 유효하지 않으면
    if (!localValue || !['dark', 'light'].includes(localValue)) {
      // os 설정 값으로 하기
      const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
      localValue = matches ? 'dark' : 'light';
    }
    return localValue;
  }, []);

  const [mode, setMode] = useState(getInitialTheme);
  // Mode 상태 토글하는 함수
  const toggleMode = useCallback(
    () => setMode(prev => (prev === 'dark' ? 'light' : 'dark')),
    [],
  );
  // 테마 값이 바뀔 때마다, 로컬스토리지 값 설정하기
  useEffect(() => {
    window.localStorage.setItem('mode', Mode);
  }, [mode]);

  return <Mode.Provider value={{ mode, toggleMode }}>{children}</Mode.Provider>;
}

export const useMode = () => {
  const context = useContext(Mode);
  if (!context) throw new Error('not mode Context');
  const { mode, toggleMode } = context;
  return [mode, toggleMode];
};
