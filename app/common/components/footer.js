'use client';

import Image from 'next/image';

export default function Footer() {
    return (
        <footer>
            <div className="footer-wrapper">
                <div className="container footer_inner">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="footer-logo">
                                <a href="#"><img src="/images/footer-logo.png"/></a>
                            </div>
                        </div>
                        <div className="col-md-8 popular-cuisines-clm">
                            <div className="popular-cuisines-list row">
                                <div className="col-md-3">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container footer_bottom_inner">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="footer-bottom-logo">
                                <img src="/images/footer-bottom-logo.png"/>
                            </div>
                        </div>
                        <div className="col-md-6 social-logos">
                            <div className="footer-social-logo">
                                <a href=""><img src="/images/fb-icon.png"/></a>
                                <a href=""><img src="/images/insta-icon.png"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}