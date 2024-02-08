import { Link } from 'react-router-dom';
import Filter from 'components/filter';
import { useGetTableDataQuery, useRemoveDataMutation } from '../api';

import styles from './../styles/table.module.scss';
import { useEffect, useState } from 'react';
import { TableData } from 'interfaces/tableData';

export default function TablePage() {
  const getTableDataQuery = useGetTableDataQuery();
  const [removeData] = useRemoveDataMutation();
  const { data: initialData, isLoading, error } = getTableDataQuery;
  const [data, setData] = useState<TableData[]>([])

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

  return <div>
    <Filter disabled={!!data} data={data || []} setData={setData} />

    <table className={styles.table}>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Verification</th>
            </tr>
        </thead>
        <tbody>
            {data?.map((item) => (
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
            ))}
        </tbody>
    </table>
    <Link to={`/table/add`} className={styles.button} aria-label="Add new user">
        Add
    </Link>
  </div>
};
