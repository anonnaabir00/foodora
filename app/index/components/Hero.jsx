import Image from 'next/image'
import LocationSearch from "@/app/index/components/child/LocationSearch";

export default function Hero() {
    return (
        <div className="banner">
            <div className="container banner_middle">
                <div className="col-md-7">
                    <div className="heading">
                        <h1>foodora - bestelle, <span>was du</span> willst, wann du willst</h1>
                        <p>Lorem ipsum dolor sit amet consectetur. Mi feugiat ullamcorper nulla interdum donec cras morbi eu. Pharetra ullamcorper cursus id nec proin pharetra.</p>
                        <LocationSearch />
                    </div>
                </div>
                <div className="col-md-5 banner-img-wrap">
                    <div className="banner_img desktop-img">
                        <img src="/images/Group-240.png"/>
                    </div>
                    <div className="banner_img mobile-img">
                        <img src="/images/mobile-banner.png"/>
                    </div>
                </div>
            </div>
        </div>
    );
}