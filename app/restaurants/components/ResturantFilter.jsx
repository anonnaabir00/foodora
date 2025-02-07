'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResturantFilter() {
    const router = useRouter();
    const [currentData, setCurrentData] = useState([]);

    const morning = [
        { id: '80440', name: 'Idli', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Idli.png', tags: 'layout_CCS_Idli' },
        { id: '80424', name: 'Dosa', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Dosa.png', tags: 'layout_CCS_Dosa' },
        { id: '80451', name: 'Poha', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Poha.png', tags: 'layout_CCS_Poha' },
        { id: '80451', name: 'Vada', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Vada.png', tags: 'layout_CCS_Vada' },
        { id: '80475', name: 'Paratha', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Paratha.png', tags: 'layout_CCS_Paratha' },
        { id: '80475', name: 'Omelette', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Omelette.png', tags: 'layout_CCS_Omelette' },
        { id: '80382', name: 'Chole Bhature', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Chole%20Bhature.png', tags: 'layout_CCS_CholeBhature' },
        { id: '83655', name: 'Coffee', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Coffee.png', tags: 'layout_CCS_Coffee' },
        { id: '80451', name: 'Dhokla', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Dhokla.png', tags: 'layout_CCS_Dhokla' },
        { id: '80451', name: 'Pongal', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Poha-1.png', tags: 'layout_CCS_Pongal' },
        { id: '80451', name: 'Kachori', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Kachori.png', tags: 'layout_CCS_Kachori' },
        { id: '83639', name: 'Biryani', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Biryani.png', tags: 'layout_CCS_Biryani' },
        { id: '80377', name: 'Poori', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Poori.png', tags: 'layout_BAU_Contextual,poori' },
        { id: '83655', name: 'Cake', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Cake.png', tags: 'layout_CCS_Cake' },
    ];

    const afternoon = [
        { id: '83639', name: 'Biryani', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Biryani.png', tags: 'layout_CCS_Biryani' },
        { id: '83631', name: 'Pizza', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pizza.png', tags: 'layout_CCS_Pizza' },
        { id: '83637', name: 'Burger', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Burger.png', tags: 'layout_CCS_Burger' },
        { id: '83633', name: 'North Indian', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/North%20Indian.png', tags: 'layout_CCS_NorthIndian' },
        { id: '83669', name: 'Rolls', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Rolls.png', tags: 'layout_CCS_Rolls' },
        { id: '80435', name: 'Pure Veg', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pure%20Veg.png', tags: 'layout_CCS_PureVeg' },
        { id: '80451', name: 'Chinese', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Chinese.png', tags: 'layout_CCS_Chinese' },
        { id: '80479', name: 'Pasta', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pasta.png', tags: 'layout_CCS_Pasta' },
        { id: '80402', name: 'Shawarma', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Shawarma.png', tags: 'layout_Shawarma_Contextual' },
        { id: '83640', name: 'Ice Cream', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Ice%20Cream.png', tags: 'layout_CCS_IceCreams' },
        { id: '83655', name: 'Cake', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Cake.png', tags: 'layout_CCS_Cake' },
    ];

    const evening = [
        { id: '83631', name: 'Pizza', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pizza.png', tags: 'layout_CCS_Pizza' },
        { id: '83637', name: 'Burger', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Burger.png', tags: 'layout_CCS_Burger' },
        { id: '80451', name: 'Chinese', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Chinese.png', tags: 'layout_CCS_Chinese' },
        { id: '80451', name: 'Momo', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Momo.png', tags: 'layout_CCS_Momo' },
        { id: '83669', name: 'Rolls', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Rolls.png', tags: 'layout_CCS_Rolls' },
        { id: '83639', name: 'Biryani', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Biryani.png', tags: 'layout_CCS_Biryani' },
        { id: '80402', name: 'Shawarma', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Shawarma.png', tags: 'layout_Shawarma_Contextual' },
        { id: '80355', name: 'Pastry', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pastry.png', tags: 'layout_CCS_Pastry' },
        { id: '80451', name: 'Pakoda', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pakoda.png', tags: 'layout_CCS_Pakoda' },
        { id: '83673', name: 'Shakes', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Shake.png', tags: 'layout_CCS_Shakes' },
        { id: '83655', name: 'Cake', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Cake.png', tags: 'layout_CCS_Cake' },
    ];

    const night = [
        { id: '83631', name: 'Pizza', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pizza.png', tags: 'layout_CCS_Pizza' },
        { id: '83637', name: 'Burger', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Burger.png', tags: 'layout_CCS_Burger' },
        { id: '83633', name: 'North Indian', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/North%20Indian.png', tags: 'layout_CCS_NorthIndian' },
        { id: '83639', name: 'Biryani', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Biryani.png', tags: 'layout_CCS_Biryani' },
        { id: '80435', name: 'Pure Veg', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pure%20Veg.png', tags: 'layout_CCS_PureVeg' },
        { id: '83634', name: 'South Indian', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/South%20Indian.png', tags: 'layout_CCS_SouthIndian' },
        { id: '80402', name: 'Shawarma', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Shawarma.png', tags: 'layout_Shawarma_Contextual' },
        { id: '80451', name: 'Kebabs', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Kebab.png', tags: 'layout_CCS_Kebabs' },
        { id: '80355', name: 'Pastry', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pastry.png', tags: 'layout_CCS_Pastry' },
        { id: '83640', name: 'Ice Cream', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Ice%20Cream.png', tags: 'layout_CCS_IceCreams' },
        { id: '83655', name: 'Cake', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Cake.png', tags: 'layout_CCS_Cake' },
    ];

    // Function to get current Indian time (IST)
    const getIndianTime = () => {
        const now = new Date();
        const options = { timeZone: 'Asia/Kolkata' };
        const ISTTime = now.toLocaleString('en-IN', options);
        console.log(`Current Indian Time: ${ISTTime}`);
        return new Date(now.toLocaleString('en-US', options));
    };

    // Function to determine which array to load based on time
    const getCurrentData = () => {
        const now = getIndianTime();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = hours * 100 + minutes;

        if (currentTime >= 200 && currentTime < 1130) {
            return morning;
        } else if (currentTime >= 1130 && currentTime < 1600) {
            return afternoon;
        } else if (currentTime >= 1600 && currentTime < 1830) {
            return evening;
        } else {
            return night;
        }
    };

    // Load data based on current time
    useEffect(() => {
        const data = getCurrentData();
        setCurrentData(data);
    }, []);

    // Handle click to navigate to the category page with query parameters
    const handleCollectionClick = (collection) => {
        router.push(`/${collection.name.toLowerCase()}?name=${collection.name}&collectionId=${collection.id}&tags=${collection.tags}`);
    };

    return (
        <div className="food-icons">
            <div className="container food-icons_inner">
                {currentData.map((collection) => (
                    <div
                        key={collection.id}
                        className="icon-list"
                        onClick={() => handleCollectionClick(collection)}
                    >
                        <img className="tw-w-[90px]" src={collection.image} alt={collection.name} />
                        {/*<p>{collection.name}</p>*/}
                    </div>
                ))}
            </div>
        </div>
    );
}