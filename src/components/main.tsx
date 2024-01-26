import { NavLink } from "react-router-dom";

import layoutStyle from "./../styles/layout.module.scss";

export default function Main() {
    return (
        <p className={layoutStyle.description}>Manage the data in <NavLink to="/table">your table</NavLink></p>
    )
}