'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';

export default function LocationSlider() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 480);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div
                onClick={onClick}
                style={{
                    position: 'absolute',
                    ...(isMobile ? {
                        right: '180px',
                        bottom: '0px',
                        top: 'auto',
                        background: 'white',
                        border: '1px solid #e0e0e0',
                        color: '#000'
                    } : {
                        right: '60px',
                        top: -50,
                        background: '#000',
                        color: '#fff'
                    }),
                    width: '32px',
                    height: '32px',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    borderRadius: '5px'
                }}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="15 18 9 12 15 6"/>
                </svg>
            </div>
        );
    };

    const CustomNextArrow = (props) => {
        const {onClick} = props;
        return (
            <div
                onClick={onClick}
                style={{
                    position: 'absolute',
                    ...(isMobile ? {
                        bottom: '0px',
                        top: 'auto',
                        right: '140px',
                        background: 'white',
                        border: '1px solid #e0e0e0',
                        color: '#000'
                    } : {
                        right: 0,
                        top: -50,
                        background: '#000',
                        color: '#fff'
                    }),
                    width: '32px',
                    height: '32px',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    borderRadius: '5px'
                }}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            </div>
        );
    };

    const settings = {
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        prevArrow: <CustomPrevArrow/>,
        nextArrow: <CustomNextArrow/>,
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
                    slidesToShow: 1.2,
                    slidesToScroll: 1,
                    centerMode: false,
                    infinite: false,
                    arrows: true,
                },
            },
        ],
    };

    return (
        <div className="location_slider">
            <div className="container slider_inner">
                <div className="slider_title" style={{ position: 'relative', marginBottom: '20px' }}>
                    <h2>Foodora gibt's auch in deiner Stadt!</h2>
                </div>
                <div className="sliderr_img" style={{
                    marginBottom: isMobile ? '60px' : '20px'
                }}>
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