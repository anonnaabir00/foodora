'use client';

import { useRouter } from 'next/navigation';

export default function ResturantFilter() {
    const router = useRouter();


    const collections = [
        { id: '83637', name: 'Burger', image: './images/Group 241.png', tags: 'layout_CCS_Burger' },
        { id: '83631', name: 'Pizza', image: './images/Group 241 (1).png', tags: 'layout_CCS_Pizza' },
        { id: '83636', name: 'Snack', image: './images/Group 241 (2).png', tags: 'layout_CCS_Snack' },
        { id: '83639', name: 'Chicken', image: './images/Group 241 (3).png', tags: 'layout_CCS_Chicken' },
        { id: '83655', name: 'Coffee', image: './images/Group 241 (4).png', tags: 'layout_CCS_Coffee' },
        { id: '83640', name: 'Breads', image: './images/Group 241 (5).png', tags: 'layout_CCS_Breads' },
        { id: '83655', name: 'Cake', image: './images/Group 241 (6).png', tags: 'layout_CCS_Cake' },
        { id: '80424', name: 'Dosa', image: './images/Group 241 (7).png', tags: 'layout_CCS_Dosa' },
        { id: '80451', name: 'Hotdog', image: './images/Group 241 (8).png', tags: 'layout_CCS_Hotdog' },
        { id: '83633', name: 'North Indian', image: './images/Group 241 (9).png', tags: 'layout_CCS_NorthIndian' },
        { id: '83634', name: 'South Indian', image: './images/Group 241 (10).png', tags: 'layout_CCS_SouthIndian' },
        { id: '80435', name: 'Pure Veg', image: './images/Group 241 (11).png', tags: 'layout_CCS_PureVeg' },
        { id: '80479', name: 'Pasta', image: './images/Group 241 (12).png', tags: 'layout_CCS_Pasta' },
        { id: '80394', name: 'Salad', image: './images/Group 241 (13).png', tags: 'layout_CCS_Salad' },
        { id: '80463', name: 'Noodles', image: './images/Group 241 (14).png', tags: 'layout_BAU_Contextual,noodles' },
        { id: '80382', name: 'Chole Bhature', image: './images/Group 241 (15).png', tags: 'layout_CCS_CholeBhature' },
        { id: '80475', name: 'Paratha', image: './images/Group 241 (16).png', tags: 'layout_CCS_Paratha' },
        { id: '83669', name: 'Rolls', image: './images/Group 241 (17).png', tags: 'layout_CCS_Rolls' },
        { id: '80440', name: 'Idli', image: './images/Group 241 (18).png', tags: 'layout_CCS_Idli' },
        { id: '80402', name: 'Shawarma', image: './images/Group 241 (19).png', tags: 'layout_Shawarma_Contextual' },
        { id: '83673', name: 'Shakes', image: './images/Group 241 (20).png', tags: 'layout_CCS_Shakes' },
        { id: '80377', name: 'Poori', image: './images/Group 241 (21).png', tags: 'layout_BAU_Contextual,poori' },
        { id: '80355', name: 'Pastry', image: './images/Group 241 (22).png', tags: 'layout_CCS_Pastry' },
        { id: '83640', name: 'Ice Cream', image: './images/Group 241 (23).png', tags: 'layout_CCS_IceCreams' },
        { id: '80451', name: 'Kebabs', image: './images/Group 241 (24).png', tags: 'layout_CCS_Kebabs' }
    ];

    // Handle click to navigate to the category page with query parameters
    const handleCollectionClick = (collection) => {
        router.push(`/${collection.name.toLowerCase()}?name=${collection.name}&collectionId=${collection.id}&tags=${collection.tags}`);
    };

    return (
        <div className="food-icons">
            <div className="container food-icons_inner">
                {collections.map((collection) => (
                    <div
                        key={collection.id}
                        className="icon-list"
                        onClick={() => handleCollectionClick(collection)}
                    >
                        <img src={collection.image} alt={collection.name} />
                        <p>{collection.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}