import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import navStyle from './../styles/navigation.module.scss';

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleOpenModal = (path: string) => {
        navigate(path, { state: { backgroundLocation: location } });
      };
    return (
        <nav className={navStyle.navigation}>
            <button onClick={() => handleOpenModal('/login')}>Login</button>
            <button onClick={() => handleOpenModal('/registration')}>Registration</button>
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
    )
}
