import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetTableMetaDataByUserQuery } from "api/table.service.";
import Spinner from "components/spinner";
import Table from "components/table";
import { RootState } from "store/store";

export default function TablePage() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.currentUser);

  if (!user) return <Spinner />;

  const { data: tableData, isLoading } = useGetTableMetaDataByUserQuery(user.id);

  const handleCreateTable = () => {
    navigate('/table/create');
  }

  if (isLoading) return <Spinner />;

  return <>
    { tableData?.length ?
      <Table tableId={ tableData.id } /> :
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
    }
  </>
};
