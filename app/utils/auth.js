import Cookies from 'js-cookie';

export const isAuthenticated = () => {
    const userData = Cookies.get('userData');
    return !!userData;
};

export const getUser = () => {
    const userData = Cookies.get('userData');
    return userData ? JSON.parse(userData) : null;
};

export const logout = () => {
    Cookies.remove('userData');
    window.location.href = '/login'; // or wherever you want to redirect
};
