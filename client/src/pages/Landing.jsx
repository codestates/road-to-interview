import { useSelector } from 'react-redux';

export default function Landing() {
  const { userInfo } = useSelector(state => state.users);
  return (
    <div>
      <h1>{userInfo?.nickname}</h1>
    </div>
  );
}
