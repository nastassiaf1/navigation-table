import { useNavigate } from "react-router-dom";

export default function TableCreator() {
    const navigate = useNavigate();

    const handleCreateTable = () => {
        navigate('/table/create');
    }

    return <>
        <div className='wrapper'>
            <p>You don't have any table.<br />
                <span>Please create a new one</span>
            </p>
            <button
                aria-label="Create new table"
                onClick={handleCreateTable}
            >
                Create table
            </button>
        </div>
    </>
};
