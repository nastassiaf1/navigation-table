import { Link } from 'react-router-dom';
import { useGetTableDataQuery, useRemoveDataMutation } from './../api';

import styles from './../styles/table.module.scss';

export default function Table() {
  const getTableDataQuery = useGetTableDataQuery();
  const [removeData] = useRemoveDataMutation();
  const { data, isLoading, error } = getTableDataQuery;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  async function onDeleteUser(id: string) {
    await removeData(id);
  }

  return <div>
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
                        <button className="" aria-label={`Remove user ${item.name}, id ${item.id}`} onClick={() => onDeleteUser(item.id!)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    <Link to={`/table/add`} className={styles.addbutton} aria-label="Add new user">
        Add
    </Link>
  </div>
};
