
const configs = {

    centerMode:false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 0, 
    responsive: [
        {
        breakpoint: 301,
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: false }
        },
        {
        breakpoint: 419,
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: false }
        },
        {
        breakpoint: 768,
        settings: { slidesToShow: 3, slidesToScroll: 2, infinite: false }
        },
        {
        breakpoint: 1025,
        settings: { slidesToShow: 4, slidesToScroll: 3, infinite: false }
        }
    ] 
};

export default configs;