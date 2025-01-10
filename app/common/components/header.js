'use client';

import Image from 'next/image';

export default function Header() {
    return (
        <header>
            <div className="top_section">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="top_text">
                                <Image src="/images/fi_10252887.png" alt="Icon" width={24} height={24} />
                                <p>Lorem ipsum dolor sit amet consectetur.</p>
                            </div>
                        </div>
                        <div className="top_close">
                            <Image src="/images/Close.png" alt="Close" width={24} height={24} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="header_sec">
                            <div className="logo">
                                <a href="/">
                                    <Image src="/images/Vector-1.png" alt="Logo" width={100} height={50} />
                                </a>
                            </div>
                            <div className="login_button">
                                <button className="sign_up" onClick={() => console.log('Sign Up')}>Sign Up</button>
                                <button className="log_in" onClick={() => console.log('Log In')}>Log In</button>
                                <button className="popup-btn" onClick={() => console.log('Open Cart')}>
                                    <Image src="/images/cart-button.png" alt="Cart" width={24} height={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}