import ResturantFilter from "@/app/resturants/components/ResturantFilter";
import ResturantCard from "@/app/resturants/components/ResturantCard";

export default function Resturants() {
    return (
        <div>
            <main>
                <div className="breadcrumb">
                    <div className="container breadcrumb_inner">
                        <div className="breadcrumb_list">
                            <a href="#"><img className="home-btn" src="./images/Breadcrumb base.png"/></a>
                            <img className="arrow-icon" src="./images/Right Chevron.png"/>
                            <p className="current-page-name">Find Restaurants</p>
                        </div>
                    </div>
                </div>

                <ResturantFilter />
                <ResturantCard/>


            </main>
        </div>
    );
}