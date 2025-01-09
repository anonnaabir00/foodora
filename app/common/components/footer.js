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
                                <a href="#"><Image src="/images/footer-logo.png" alt="Logo" width={100} height={50} /></a>
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
                                {/* Add more columns as needed */}
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
                                <Image src="/images/footer-bottom-logo.png" alt="Logo" width={100} height={50} />
                            </div>
                        </div>
                        <div className="col-md-6 social-logos">
                            <div className="footer-social-logo">
                                <a href=""><Image src="/images/fb-icon.png" alt="Facebook" width={24} height={24} /></a>
                                <a href=""><Image src="/images/insta-icon.png" alt="Instagram" width={24} height={24} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}