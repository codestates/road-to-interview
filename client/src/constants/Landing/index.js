import { ReactComponent as Test } from 'assets/test-ill.svg';
import { ReactComponent as Feedback } from 'assets/checklist-ill.svg';
import { ReactComponent as Share } from 'assets/share-ill.svg';

export const sectionData = [
  {
    Vector: Test,
    title: '인터뷰 테스트',
    text: '제한시간 내에 준비된 인터뷰 질문에 답하는 테스트를 진행할 수 있습니다. 실제 화상면접처럼, 웹캠을 키고 말해보세요!',
  },
  {
    Vector: Feedback,
    title: '개인 피드백',
    text: '녹화된 테스트 영상과 관리자가 준비한 모범 답변을 보면서 피드백하세요!',
  },
  {
    Vector: Share,
    title: '공유하기',
    text: '인터뷰 질문 목록과 답변을 다른 사람들과 공유할 수 있습니다!',
  },
];

export const QnAData = [
  {
    id: '1',
    title: 'Q 인터뷰 대비에 어떤 도움이 되나요?',
    desc: '....',
  },
  {
    id: '2',
    title: 'Q 회원가입 없이 이용할 수 있나요?',
    desc: '....',
  },
  {
    id: '3',
    title: 'Q 인터뷰 준비 팁은 무엇이 있을까요?',
    desc: '....',
  },
];

export const FooterData = [
  {
    name: '김인태',
    role: 'FE',
    link: 'https://github.com/scvd03',
  },
  {
    name: '정성준',
    role: 'FE',
    link: 'https://github.com/jvn4dev',
  },
  {
    name: '임훈',
    role: 'FE',
    link: 'https://github.com/findmytrueself',
  },
  {
    name: '김용건',
    role: 'BE',
    link: 'https://github.com/yg-kim-korean',
  },
];

export const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 500,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: dots => <ul>{dots}</ul>,
  customPaging: () => (
    <div className="dots__dot">
      <span></span>
    </div>
  ),
};
