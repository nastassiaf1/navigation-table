import { Link } from 'react-router-dom';
import { useGetTableDataQuery } from './../api';

import styles from './../styles/table.module.scss';

export default function Table() {
  const { data, error, isLoading } = useGetTableDataQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return <div>
    <table className={styles.table}>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <td>Verification</td>
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
                        <Link to={`/table/${item.id}/edit`}>Edit</Link>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    <button type="button" className={styles.addbutton}>Add</button>
  </div>
};
