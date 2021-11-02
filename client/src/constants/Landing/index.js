export const footerData = [
  {
    href: 'https://github.com/scvd03',
    src: '/images/intae.png',
    alt: '김인태',
    name: '김인태',
    Platform: 'Github',
  },
  {
    href: 'https://github.com/yg-kim-korean',
    src: '/images/yonggun.png',
    alt: '김용건',
    name: '김용건',
    Platform: 'Github',
  },
  {
    href: 'https://github.com/jvn4dev',
    src: '/images/sungjun.png',
    alt: '정성준',
    name: '정성준',
    Platform: 'Github',
  },
  {
    href: 'https://github.com/findmytrueself',
    src: '/images/hun.png',
    alt: '임훈',
    name: '임훈',
    Platform: 'Github',
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
