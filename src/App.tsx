import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from 'components/navigation';
import AuthModal from 'components/user/authModal';
import { setUser } from 'store/slices/user.slice';

import layoutStyle from './styles/layout.module.scss';
import './styles/global.scss';

export default function App() {
    const location = useLocation();
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const user = sessionStorage.getItem('user');

        if (user) {
            dispatch(setUser(JSON.parse(user)));
        };
    }, []);

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/registration') {
            setAuthModalOpen(true);
        } else {
            setAuthModalOpen(false);
        }
    }, [location]);

    return <>
        <header className={layoutStyle.header}>
            <h1>
                <Link to="/">TableBY</Link>
            </h1>
            <Navigation></Navigation>
        </header>
        <main className={layoutStyle.main}>
            <Outlet />
            {isAuthModalOpen && <AuthModal />}
        </main>
    </>
}
