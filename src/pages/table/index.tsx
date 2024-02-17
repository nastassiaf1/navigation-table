import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetTablesMetaDataByUserQuery } from "api/table.service.";
import Spinner from "components/spinner";
import Table from "components/table";
import { RootState } from "store/store";

import styles from "./../../styles/table.module.scss";
import AddTableModal from "components/table/addTableModal";

export default function TablePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const location = useLocation();
  const isModalOpenByRouter = location.pathname.includes('/table/create');

  useEffect(() => {
    if (isModalOpenByRouter && !isModalOpen) {
      useState(setIsModalOpen(true));
    }
  }, [isModalOpenByRouter]);

  if (!user) return <Spinner />;

  const { data: tableData, isLoading } = useGetTablesMetaDataByUserQuery(user.id);

  const handleCreateTable = () => {
    console.log('handleCreateTable')
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log('handleCloseModal')
    setIsModalOpen(false);
  };

  if (isLoading) return <Spinner />;

  return <>
    {isModalOpen && <AddTableModal onClose={handleCloseModal} />}
    { tableData?.length ?
      <Table tableId={ tableData[0].id } /> :
      <div className={ styles.mainwrapper }>
          <p className={ styles.description }>You don't have any table.<br />
              <span>Please create a new one</span>
          </p>
          <button
              className={ styles.addbutton }
              aria-label="Create new table"
              onClick={handleCreateTable}
          >
              Create table
          </button>
      </div>
    }
  </>
};
