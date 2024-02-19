import { Link } from 'react-router-dom';
import { useUpdateTableMutation } from '../../api/table.service.';
import { Table } from 'interfaces/table';

import styles from './../../styles/table.module.scss';

export default function Table({ data }: { data: Table }) {
  const [updateTable] = useUpdateTableMutation();

  async function onDeleteRow(rowId: string) {
    console.log(rowId)
    const updatedTable =  {
      ...data,
      rows: data.rows!.filter(row => row.id !== rowId)
    };
    await updateTable(updatedTable);
  }

  return (
    <div className={styles.tablewrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {data.columns.map((columnName) => (
              <th key={columnName}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            data.rows ? data.rows.map((row) => (
              <tr key={row.id}>
                {data.columns.map((columnName) => (
                  <td key={`${row.id}-${columnName}`}>{row[columnName]}</td>
                ))}
                <td>
                  <Link to={`/table/${data.id}/edit/${row.id}`} aria-label="Edit row">Edit</Link>
                  <button className={styles.button} onClick={() => onDeleteRow(row.id)}>Delete</button>
                </td>
              </tr>
            )) :
            <tr className={styles.description}>
              <td colSpan={data.columns.length}>No data found in the table</td>
            </tr>
          }
        </tbody>
      </table>
      <Link to={`/table/${data.id}/add`} className={styles.button} aria-label="Add new row">
          Add
      </Link>
    </div>
  )
};
