import React from 'react';
import '../styles/Navigation.css'

interface NavigationProps {
    onLogin: () => void;
    onLogout: () => void;
    onRegister: () => void;
}

const Navigation: React.FC<NavigationProps> = ({  onLogin, onLogout, onRegister }) => {
    const isLoggedIn = sessionStorage.getItem('userId') != null;
    return (
        <nav className='navbar'>
            <div className='nav-logo'>LUMAA</div>
            <div className='nav-buttons'>
                {isLoggedIn ? (
                    <button onClick={onLogout} className='nav-button'>Logout</button>
                ) : (
                    <>
                        {/* <button onClick={onLogin} style={styles.button}>Login</button>
                        <button onClick={onRegister} style={styles.button}>Register</button> */}
                    </>
                )}
            </div>
        </nav>
    );
};


export default Navigation;