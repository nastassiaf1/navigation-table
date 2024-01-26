import { Link, NavLink, Outlet } from 'react-router-dom';
import navStyle from './styles/navigation.module.scss';
import layoutStyle from './styles/layout.module.scss';

import './styles/global.scss';

export default function App() {
    return <>
        <header className={layoutStyle.header}>
            <h1>
                <Link to="/">Table</Link>
            </h1>
            <nav className={navStyle.navigation}>
                <NavLink
                    to="/table"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                    >
                    Table
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    About us
                </NavLink>
            </nav>
        </header>
        <main className={layoutStyle.main}>
            <Outlet />
        </main>
    </>
}
