import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function NotFound() {
  const history = useHistory();

  return (
    <div>
      해당 요청을 찾을 수 없습니다~
      <button onClick={() => history.replace('/')}>홈으로 가기</button>
    </div>
  );
}
