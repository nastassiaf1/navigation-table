import { Link } from "react-router-dom";

import layoutStyle from "./../styles/layout.module.scss";

export default function Preview() {
    return (
        <p className={layoutStyle.description}>Manage the data in <Link to="/table">your table</Link></p>
    )
}
