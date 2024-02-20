import { useState } from 'react';
import { useUpdateTableMutation } from '../../api/table.service.';
import { RowTable, Table } from 'interfaces/table';
import AddRowDialog from './addRowDialog';
import EditRowDialog from './editRowDialog';
import ModalDialogPortal from './../modalDialogPortal';

import styles from './../../styles/table.module.scss';

export default function Table({ data }: { data: Table }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<RowTable | null>(null);

  const openEditModal = (row: RowTable) => {
    setEditingRow(row);
    setIsEditModalOpen(true);
  };

  const [updateTable] = useUpdateTableMutation();

  async function onDeleteRow(rowId: string) {
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            data.rows?.length ? data.rows.map((row) => (
              <tr key={row.id}>
                {data.columns.map((columnName) => (
                  <td key={`${row.id}-${columnName}`}>{row[columnName]}</td>
                ))}
                <td>
                  <button className={styles.button} aria-label="Edit row" onClick={() => openEditModal(row)}>Edit</button>
                  <button className={`${styles.button} ${styles.deletebutton}`} aria-label="Delete row" onClick={() => onDeleteRow(row.id)}>Delete</button>
                </td>
              </tr>
            )) :
            <tr className={styles.description}>
              <td colSpan={data.columns.length}>No data found in the table</td>
            </tr>
          }
        </tbody>
      </table>
      <button className={styles.button} aria-label="Add new row" onClick={() => setIsAddModalOpen(true)}>
        Add New Row
      </button>

      { isAddModalOpen && (
        <ModalDialogPortal>
          <AddRowDialog onClose={() => setIsAddModalOpen(false)} />
        </ModalDialogPortal>
      )}
      { isEditModalOpen && (
        <ModalDialogPortal>
          <EditRowDialog row={editingRow!} onClose={() => setIsEditModalOpen(false)} />
        </ModalDialogPortal>
      )}
    </div>
  )
};
