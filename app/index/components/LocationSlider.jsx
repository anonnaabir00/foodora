export default function LocationSlider() {
    return (
        <div className="location_slider">
            <div className="container slider_inner">
                <div className="slider_title">
                    <h2>Foodora gibt's auch in deiner Stadt!</h2>
                </div>
                <div className="sliderr_img">
                    <div className="slick-slider sliderr-location">
                        <div className="element element-1">
                            <img src="./images/Frame-27-1.png"/>
                            <p>Rubtsovsk</p>
                        </div>
                        <div className="element element-2">
                            <img src="./images/Frame-27-2.png"/>
                            <p>Kansas City, KS</p>
                        </div>
                        <div className="element element-3">
                            <img src="./images/Frame-27-3.png"/>
                            <p>Olathe, KS</p>
                        </div>
                        <div className="element element-4">
                            <img src="./images/Frame-27-4.png"/>
                            <p>Remote</p>
                        </div>
                        <div className="element element-5">
                            <img src="./images/Frame-27-5.png"/>
                            <p>Kansas City Metro</p>
                        </div>
                        <div className="element element-2">
                            <img src="./images/Frame-27-3.png"/>
                            <p>Kansas City, KS</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}