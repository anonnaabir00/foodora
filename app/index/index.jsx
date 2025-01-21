import Hero from "@/app/index/components/Hero";
import LocationSlider from "@/app/index/components/LocationSlider";
import LocationPlace from "@/app/index/components/LocationPlace";
import ItemList from "@/app/index/components/ItemList";
import FeatureBox from "@/app/index/components/FeatureBox";

export default function IndexPage() {
    return (
        <>
            <Hero />
            <ItemList />
            <FeatureBox />
            {/*<LocationSlider />*/}
            {/*<LocationPlace />*/}
        </>
    );
}
