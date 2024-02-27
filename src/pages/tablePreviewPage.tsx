import TableCarousel from 'components/tableCarousel';

import style from './../styles/preview.module.scss';

export default function TablePreviewPage() {
    return <div className={style.wrapper}>
        <h2 className={style.title}>Dynamic Table Management System</h2>
        <TableCarousel />
        <p>
            our contacts: <a href="https://www.linkedin.com/in/nastassia-f-44986b195" target="_blank">Git</a>
        </p>
    </div>
}
