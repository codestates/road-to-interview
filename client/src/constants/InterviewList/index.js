export const modalSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: dots => <ul>{dots}</ul>,
  customPaging: () => <span className="dots__dot"></span>,
};
