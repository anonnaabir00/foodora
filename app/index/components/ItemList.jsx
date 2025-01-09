export default function ItemList() {
    return (
        <div className="item_list">
            <div className="container item_list_inner">
                <div className="row">
                    <div className="col-md-5">
                        <div className="item-list-btns">
                            <a href="#">Vladikavkaz (Osetinskaya ASSR)</a>
                            <a href="#">Tampa (FL)</a>
                            <a href="#">Resistencia</a>
                            <a href="#">Aurora (IL)</a>
                            <a href="#">Salem (OR)</a>
                            <a href="#">La Plata</a>
                            <a href="#">Chelyabinsk</a>
                            <a href="#">Krasnodar</a>
                            <a href="#">Kiel</a>
                            <a href="#">Morón</a>
                            <a href="#">Lomas de Zamora</a>
                            <a href="#">Mönchengladbach</a>
                            <a href="#">Cincinnati (OH)</a>
                            <a href="#">Morón</a>
                            <a href="#">North Las Vegas (NV)</a>
                            <a href="#">Kiel</a>
                            <a href="#">Wuppertal</a>
                            <a href="#">Lomas de Zamora</a>
                            <a href="#">San Isidro</a>
                        </div>
                    </div>
                    <div className="col-md-7 popular-cuisines-clm">
                        <h3 className="location-name">Popular Cuisines</h3>
                        <div className="popular-cuisines-list row">
                            <div className="col-md-3">
                                <h4>Oslo</h4>
                                <ul className="cuisines-list">
                                    <li><a href="#">Sushi</a></li>
                                    <li><a href="#">Pizza</a></li>
                                    <li><a href="#">Indian</a></li>
                                    <li><a href="#">Asian</a></li>
                                    <li><a href="#">Burger</a></li>
                                    <li><a href="#">Mexican</a></li>
                                    <li><a href="#">Italian</a></li>
                                    <li><a href="#">Halal</a></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <h4>Bergen</h4>
                                <ul className="cuisines-list">
                                    <li><a href="#">Sushi</a></li>
                                    <li><a href="#">Pizza</a></li>
                                    <li><a href="#">Indian</a></li>
                                    <li><a href="#">Asian</a></li>
                                    <li><a href="#">Burger</a></li>
                                    <li><a href="#">Mexican</a></li>
                                    <li><a href="#">Italian</a></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <h4>Trondheim</h4>
                                <ul className="cuisines-list">
                                    <li><a href="#">Sushi</a></li>
                                    <li><a href="#">Pizza</a></li>
                                    <li><a href="#">Indian</a></li>
                                    <li><a href="#">Asian</a></li>
                                    <li><a href="#">Burger</a></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <h4>Kristiansand</h4>
                                <ul className="cuisines-list">
                                    <li><a href="#">Burger</a></li>
                                    <li><a href="#">Asian</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}