import { useNavigate } from "react-router-dom";

import styles from "./../../styles/table.module.scss";

export default function TableCreator() {
    const navigate = useNavigate();

    const handleCreateTable = () => {
        navigate('/table/create');
    }

    return <>
        <div className='wrapper'>
            <p className={ styles.description }>You don't have any table.<br />
                <span>Please create a new one</span>
            </p>hello
            <button
                className={ styles.button }
                aria-label="Create new table"
                onClick={handleCreateTable}
            >
                Create table
            </button>
        </div>
    </>
};
