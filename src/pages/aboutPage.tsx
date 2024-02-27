import { Link } from 'react-router-dom';

import style from './../styles/about.module.scss';

export default function About() {
    return <div className={style.wrapper}>
        <h2 className={style.title}>Dynamic Table Management System</h2>
        <p className={style.description}>
            The Dynamic Table Management System is an innovative web application designed
            to offer users a flexible and user-friendly platform for creating and managing tables dynamically.
            This project empowers users to effortlessly construct tables according to their specific needs,
            including defining columns, and seamlessly editing the content within these tables.
            It caters to a wide array of users, from data analysts to project managers,
            enabling them to organize and manipulate data effectively.
        </p>
        <div>
            <span>See more in </span>
            <Link to="./preview">Preview</Link>
        </div>
    </div>
}
