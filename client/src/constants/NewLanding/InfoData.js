import CoffeeProgrammer from '@/components/NewLanding/CoffeeProgrammer';
import Teams from '@/components/NewLanding/Teams';
import TalkingPerson from '@/components/NewLanding/TalkingPerson';

export const infoObjs = [
  {
    headline: `세상에 배울건 너무나도 많으니까!`,
    description:
      '공부중인 기술 혹은 스택이 있다면 직접 문제집으로 만들어 공부해보세요. 문제들에 직접 대답하면서 해당 스택을 공부해볼 수 있습니다.',
    buttonLabel: '문제집 만들러가기',
    imgStart: false,
    svgComponent: <CoffeeProgrammer />,
    to: '/create',
  },
  {
    headline: '더 좋은 개발자가 되기 위해 함께 공부해요.',
    description:
      '문제집을 만들기 어렵다면 다른 사람들이 만든 문제집들을 볼 수 있습니다. 지금 나에게 도움이 될만한 문제집을 찾아 면접을 준비해보세요.',
    buttonLabel: '문제집 보러가기',
    imgStart: true,
    svgComponent: <Teams />,
    to: '/list',
  },
  {
    headline: '요즘 기업들에 유행하는 기술이 뭐가 있을까?',
    description: '개발자 구직공고를 통해 요즘 유행하는 기술들을 파악해볼 수 있습니다. 매일 새로운 공고를 확인해보세요.',
    buttonLabel: '개발자 공고보기',
    imgStart: false,
    svgComponent: <TalkingPerson />,
    to: '/recruit',
  },
];
