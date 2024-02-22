import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "store/selectors/user";
import { logoutUser } from "store/slices/user.slice";

import styles from "./../styles/userPage.module.scss";

export default function UserPage() {
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(logoutUser());
        navigate('/');
    }

    return <div className={styles.container}>
        <h2 className={styles.header}>
            Hello, <span className={styles.headerItem}>{user!.name}</span>
        </h2>
        <div>
            <button className={styles.logoutButton} onClick={handleLogOut}>Log out</button>
        </div>
    </div>
}
