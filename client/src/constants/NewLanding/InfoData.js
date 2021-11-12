import CoffeeProgrammer from '@/components/NewLanding/CoffeeProgrammer';
import Teams from '@/components/NewLanding/Teams';
import TalkingPerson from '@/components/NewLanding/TalkingPerson';

export const infoObjs = [
  {
    topLine: '제목 넣을거 생각',
    headline: '부제목 넣을거',
    description:
      '샬라샬라샤랄랴사라라라샬라랴아아야샬라샬라샤랄랴사라라라샬라랴아아야샬라샬라샤랄랴사라라라샬라랴아아야샬라샬라샤랄랴사라라라샬라랴아아야',
    buttonLabel: '시작하기',
    imgStart: false,
    svgComponent: <CoffeeProgrammer />,
  },
  {
    topLine: '제목 넣을거 생각',
    headline: '부제목 넣을거 넣을거넣을거넣을거넣을거넣을거넣을거',
    description:
      '샬라샬라샤랄랴사라라라샬라랴아아야샬라샬라샤랄랴사라라라샬라랴아아야샬라샬라샤랄랴사라라라샬라랴아아야샬라샬라샤랄랴사라라라샬라랴아아야',
    buttonLabel: '시작하기',
    imgStart: true,
    svgComponent: <Teams />,
  },
  {
    topLine: '제목 넣을거 생각',
    headline: '부제목 넣을거 생각',
    description:
      '샬라샬라샤랄랴사라라라샬라랴아아야샬라샬라샤랄랴사라라라샬라랴아아야샬라샬라샤랄랴사라라라샬라랴아아야샬라샬라샤랄랴사라라라샬라랴아아야',
    buttonLabel: '시작하기',
    imgStart: false,
    svgComponent: <TalkingPerson />,
  },
];
