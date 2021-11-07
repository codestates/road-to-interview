import { ReactComponent as ArrowPrev } from 'assets/arrow-narrow-left.svg';
import { ReactComponent as ArrowNext } from 'assets/arrow-narrow-right.svg';

export const modalSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: dots => <ul>{dots}</ul>,
  customPaging: () => <span className="dots__dot"></span>,
  // nextArrow: (
  //   <i>
  //     <ArrowNext width="1.7rem" height="1.7rem" />
  //   </i>
  // ),
  // prevArrow: (
  //   <i>
  //     <ArrowPrev width="1.7rem" height="1.7rem" />
  //   </i>
  // ),
};
