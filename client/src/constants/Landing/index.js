export const FooterData = [
  {
    name: '김인태',
    role: 'FE',
    link: 'https://github.com/scvd03',
  },
  {
    name: '정성준',
    role: 'FE',
    link: 'https://github.com/findmytrueself',
  },
  {
    name: '임훈',
    role: 'FE',
    link: 'https://github.com/jvn4dev',
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
