'use client';

import Link from 'next/link'

export default function Header() {
    return (
        <header>
            <div className="top_section">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="top_text">
                                <img src="/images/fi_10252887.png"/>
                                <p>Lorem ipsum dolor sit amet consectetur.</p>
                            </div>
                        </div>
                        <div className="top_close">
                            <img src="/images/Close.png"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="header_sec">
                            <div className="logo">
                                <Link href="/">
                                    <img src="/images/Vector-1.png"/>
                                </Link>
                            </div>
                            <div className="login_button">
                                <button className="sign_up" onClick={() => console.log('Sign Up')}>Sign Up</button>
                                <button className="log_in" onClick={() => console.log('Log In')}>Log In</button>
                                <button className="popup-btn" onClick={() => console.log('Open Cart')}>
                                    <img src="/images/cart-button.png"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}