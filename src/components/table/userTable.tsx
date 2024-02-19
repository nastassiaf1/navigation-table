import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Filter from 'components/filter';
//import { useGetTableDataQuery, useRemoveDataMutation } from '../../api/table.service.';
//import { TableData } from 'interfaces/table';

import styles from './../../styles/table.module.scss';
//draft
/*export default function Table({ tableId }: { tableId: string }) {
  const [removeData] = useRemoveDataMutation();
  const [data, setData] = useState<TableData[]>([])
  const getTableDataQuery = useGetTableDataQuery();
  const { data: initialData, isLoading, error } = getTableDataQuery;

  useEffect(() => {
    setData(initialData || [])
  }, [initialData])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {(error as Error).message}</div>;
  }

  async function onDeleteUser(id: string) {
    await removeData(id);
  }

  return <div className={styles.tablewrapper}>
    <Filter disabled={!!data} setData={setData} data={initialData || []}/>

    { data.length ?
      <table className={styles.table}>
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Verification</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              { data.map((item) => (
                  <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{`${item.isVerified}`}</td>
                      <td>
                          <Link to={`/table/${item.id}/edit`} aria-label={`Edit user ${item.name}, id ${item.id}`}>Edit</Link>
                          <button className={`${styles.button} ${styles.itembutton}`} aria-label={`Remove user ${item.name}, id ${item.id}`} onClick={() => onDeleteUser(item.id!)}>Delete</button>
                      </td>
                  </tr>
                ))
              }
          </tbody>
      </table> :
      <p className={styles.description}>Users not found</p>
    }
    <Link to={`/table/add`} className={styles.button} aria-label="Add new user">
        Add
    </Link>
  </div>
};*/
