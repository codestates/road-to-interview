export const modalSettings = {
  dots: true,
  infinite: true,
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
