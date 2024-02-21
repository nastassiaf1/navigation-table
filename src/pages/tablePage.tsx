import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { useGetTablesDataByUserQuery } from "api/table.service.";
import Spinner from "components/spinner";
import Table from "components/table";
import { RootState } from "store/store";
import { setCurrentTable } from 'store/slices/currentTable.slice';
import ModalDialogPortal from "components/modalDialogPortal";
import AddTableDialog from "components/table/addTableDialog";

import styles from "./../../styles/table.module.scss";

export default function TablePage() {
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const user = useSelector((state: RootState) => state.user.currentUser);
  const location = useLocation();
  const navigate = useNavigate();
  const { tableId } = useParams();
  const dispatch = useDispatch();
  const isDialogOpenedByRouter = location.pathname.includes('/table/create');

  useEffect(() => {
    if (isDialogOpenedByRouter && !isDialogOpened) {
      useState(setIsDialogOpened(true));
    }
  }, [isDialogOpenedByRouter]);

  if (!user) return <Spinner />;

  const { data: tableData, isLoading } = useGetTablesDataByUserQuery(user.id);

  useEffect(() => {
    if (tableId && tableData) {
      setActiveTab(tableId);

      const currentTable = tableData.find(table => table.id === tableId);
      if (currentTable) {
        dispatch(setCurrentTable(currentTable));
      }
    } else if (tableData && tableData.length > 0) {
      navigate(`/table/${tableData[0].id}`, { replace: true });
    }
  }, [tableId, tableData]);

  const handleCreateTable = () => {
    setIsDialogOpened(true);
  };

  const handleCloseModal = () => {
    setIsDialogOpened(false);
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    const currentTale = tableData?.find(({ id }) => id === newValue );
    dispatch(setCurrentTable(currentTale || null));

    setActiveTab(newValue);
    navigate(`/table/${newValue}`, { replace: true });
  };

  if (isLoading) return <Spinner />;

  return <div>
    {isDialogOpened && <ModalDialogPortal>
      <AddTableDialog onClose={handleCloseModal} userId={user.id} />
    </ModalDialogPortal>}
    { tableData?.length ? <>
      <button
        className={styles.addbutton}
        aria-label="Create new table"
        onClick={handleCreateTable}
      >
        Create table
      </button>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList aria-label="Tables tabs" centered onChange={handleChange}>
            {tableData.map(({ name, id }) => <Tab label={name} value={`${id}`} key={id} />)}
          </TabList>
        </Box>
        {tableData.map(table => {
          return (
            <TabPanel value={`${table.id}`} key={table.id}>
              <Table data={table} />
            </TabPanel>
          );
        })}
      </TabContext>
    </>
      :
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
  </div>
};
