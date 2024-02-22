import { NavLink, useLocation, useNavigate, useMatch, PathMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'store/selectors/user';

import navStyle from './../styles/navigation.module.scss';

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(selectCurrentUser);
    const matchLogin = useMatch('/login');
    const matchRegistration = useMatch('/registration');

    const getButtonClassName = (match: PathMatch<string> | null) => match ? `${navStyle.button} active` : `${navStyle.button}`;

    const handleOpenModal = (path: string) => {
        navigate(path, { state: { backgroundLocation: location } });
    };

    return (
        <nav className={navStyle.navigation}>
            {
                user ? <>
                    <NavLink
                        to={`/user/${user.id}`}
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        { user.name }
                    </NavLink>
                    <NavLink
                        to="/table"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Tables
                    </NavLink>
                </> :
                <>
                    <button
                        className={getButtonClassName(matchLogin)}
                        onClick={() => handleOpenModal('/login')}
                    >
                        Login
                    </button>
                    <button
                        className={getButtonClassName(matchRegistration)}
                        onClick={() => handleOpenModal('/registration')}
                    >
                        Registration
                    </button>
                </>
            }
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
