'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation'

export default function Signup() {
    const [activeTab, setActiveTab] = useState('One');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const formData = new FormData(e.target);
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'signin',
                    email: formData.get('email'),
                    password: formData.get('password'),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            Cookies.set('userData', JSON.stringify(data.user), { expires: 7 });
            window.location.href = '/';
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData(e.target);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmpassword');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'signup',
                    name: formData.get('first-name'),
                    email: formData.get('email'),
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            Cookies.set('userData', JSON.stringify(data.user), { expires: 7 });
            window.location.href = '/';
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <div>
            <div className="signup_popup">
                <div className="cart-heading">
                    <h3>Welcome to Foodora</h3>
                    <p>Sign in or sign up to order your favorite food!</p>
                    {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                </div>

                <div className="signup_popup_forms">
                    <div className="signup_popup_forms-inner">
                        <div className="tab tabs-wrapper">
                            <div className="tabs-btn">
                                <button
                                    className={`tablinks ${activeTab === 'One' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('One')}
                                >
                                    <span>Sign In</span>
                                </button>
                                <button
                                    className={`tablinks ${activeTab === 'Two' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('Two')}
                                >
                                    <span>Sign Up</span>
                                </button>
                            </div>
                        </div>

                        {activeTab === 'One' && (
                            <div>
                                <div className="sign-in-up-forms">
                                    <div className="sign-in-up-forms-inner">
                                        <form id="signin-form" className="signin-up-form" onSubmit={handleSignIn}>
                                            <div className="fields-group">
                                                <div className="form-group">
                                                    <input type="email" id="email" name="email" placeholder="Enter email" required />
                                                </div>
                                                <div className="form-group password-field">
                                                    <input
                                                        type={showPassword.password ? "text" : "password"}
                                                        id="password"
                                                        name="password"
                                                        placeholder="Enter password"
                                                        required
                                                    />
                                                    <img
                                                        className="eye-icon"
                                                        src="./images/Eye.png"
                                                        alt="toggle password"
                                                        onClick={() => togglePasswordVisibility('password')}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </div>
                                            </div>
                                            <button type="submit" className="submit-btn" disabled={loading}>
                                                {loading ? 'Signing in...' : 'Sign In'}
                                            </button>
                                        </form>
                                        <button className="open-forgot-pass-popup-btn">
                                            Forgot Password?
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Two' && (
                            <div>
                                <div className="sign-in-up-forms">
                                    <div className="sign-in-up-forms-inner">
                                        <form id="signup-form" className="signin-up-form" onSubmit={handleSignUp}>
                                            <div className="fields-group">
                                                <div className="form-group">
                                                    <input type="text" id="first-name" name="first-name" placeholder="Enter name" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" id="email" name="email" placeholder="Enter email" required />
                                                </div>
                                                <div className="form-group password-field">
                                                    <input
                                                        type={showPassword.password ? "text" : "password"}
                                                        id="password"
                                                        name="password"
                                                        placeholder="Enter password"
                                                        required
                                                    />
                                                    <img
                                                        className="eye-icon"
                                                        src="./images/Eye.png"
                                                        alt="toggle password"
                                                        onClick={() => togglePasswordVisibility('password')}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </div>
                                                <div className="form-group password-field">
                                                    <input
                                                        type={showPassword.confirmPassword ? "text" : "password"}
                                                        id="confirm-password"
                                                        name="confirmpassword"
                                                        placeholder="Enter confirm password"
                                                        required
                                                    />
                                                    <img
                                                        className="eye-icon"
                                                        src="./images/Eye.png"
                                                        alt="toggle password"
                                                        onClick={() => togglePasswordVisibility('confirmPassword')}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="remember-checkbox">
                                                <label htmlFor="remember">
                                                    Remember
                                                    <input type="checkbox" id="remember" name="remember" value="Remember" />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <button type="submit" className="submit-btn" disabled={loading}>
                                                {loading ? 'Signing up...' : 'Sign Up'}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
