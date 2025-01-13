'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function LocationSlider() {
    const settings = {
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="location_slider">
            <div className="container slider_inner">
                <div className="slider_title">
                    <h2>Foodora gibt's auch in deiner Stadt!</h2>
                </div>
                <div className="sliderr_img">
                    <Slider {...settings} className="sliderr-location">
                        <div className="element element-1">
                            <img src="/images/Frame-27-1.png" alt="Rubtsovsk" />
                            <p>Rubtsovsk</p>
                        </div>
                        <div className="element element-2">
                            <img src="/images/Frame-27-2.png" alt="Kansas City, KS" />
                            <p>Kansas City, KS</p>
                        </div>
                        <div className="element element-3">
                            <img src="/images/Frame-27-3.png" alt="Olathe, KS" />
                            <p>Olathe, KS</p>
                        </div>
                        <div className="element element-4">
                            <img src="/images/Frame-27-4.png" alt="Remote" />
                            <p>Remote</p>
                        </div>
                        <div className="element element-5">
                            <img src="/images/Frame-27-5.png" alt="Kansas City Metro" />
                            <p>Kansas City Metro</p>
                        </div>
                        <div className="element element-2">
                            <img src="/images/Frame-27-3.png" alt="Kansas City, KS" />
                            <p>Kansas City, KS</p>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}