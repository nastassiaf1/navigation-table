import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useRemoveTableMutation, useUpdateTableMutation } from '../../api/table.service';
import { RowTable, Table } from 'interfaces/table';
import AddRowDialog from './addRowDialog';
import EditRowDialog from './editRowDialog';
import ModalDialogPortal from './../modalDialogPortal';
import DeleteConfirmationDialog from './deleteConfirmationDialog';

import styles from './../../styles/table.module.scss';
import uuidv4 from 'utils/uuid';

export default function Table({ data: initialData }: { data: Table }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<RowTable | null>(null);
  const [isEditColumnMode, setIsEditColumnMode] = useState(false);
  const [data, setData] = useState(structuredClone(initialData));
  const [updateTable] = useUpdateTableMutation();
  const [removeTable] = useRemoveTableMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const openEditModal = (row: RowTable) => {
    setEditingRow(row);
    setIsEditModalOpen(true);
  };

  async function onDeleteRow(rowId: string) {
    const updatedTable =  {
      ...data,
      rows: data.rows!.filter(row => row.id !== rowId)
    };

    await updateTable(updatedTable);
  }

  async function onDeleteTable(id: string) {
    await removeTable(id);

    navigate('/table');
  }

  const showDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const hideDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const confirmDeleteTable = async () => {
    await onDeleteTable(data.id);
    hideDeleteDialog();
  };

  const handleAddColumn = () => {
    const newColumnName = `Column ${data.columns.length + 1}`;
    const updatedRows = data.rows?.map(row => {
      return { ...row, [newColumnName]: '' };
    })

    setData({ ...data, rows: updatedRows, columns: [...data.columns, { name: newColumnName, id: uuidv4() }] });
  };

  const handleDeleteColumn = (columnId: string) => {
    const columnName: string | undefined = data.columns.find(({ id }) => id === columnId)?.name;
    if (!columnName) return;

    const updatedRows = data.rows?.map(row => {
      const { [columnName]: deleted, ...rest } = row;
      return { ...rest, id: row.id };
    });

    const updatedColumns = data.columns.filter(({ id }) => columnId !== id);

    setData({ ...data, rows: updatedRows || [], columns: updatedColumns });
  };

  const handleChangeColumnName = (columnId: string, newName: string) => {
    const columnsToUpdate = structuredClone(data.columns);
    const rowsToUpdate = structuredClone(data.rows);
    const updatedColumnIndex = columnsToUpdate.findIndex(({ id }) => id === columnId);

    if (updatedColumnIndex !== -1) {
      rowsToUpdate?.forEach(row => {
        row[newName] = row[columnsToUpdate[updatedColumnIndex].name];
        delete row[columnsToUpdate[updatedColumnIndex].name]
      })

      columnsToUpdate[updatedColumnIndex].name = newName;
    }

    setData({ ...data, rows: rowsToUpdate, columns: columnsToUpdate });
  };

  const handleSaveColumns = async () => {
    await updateTable(data);
    setIsEditColumnMode(false);
  };

  const handleResetColumns = () => {
    setData(initialData);
    setIsEditColumnMode(false);
  };

  const renderColumnHeaders = () => {
    if (isEditColumnMode) {
      return (
        <>
          {data.columns.map(({ name, id }) => (
            <th key={id} className={styles.columnEditing}>
              <Tooltip title={name}>
                <TextField
                  defaultValue={name}
                  onBlur={(e) => handleChangeColumnName(id, e.target.value)}
                  size="small"
                />
              </Tooltip>
              <Tooltip title="Delete Column">
                <IconButton aria-label={`Delete ${name} column`} onClick={() => handleDeleteColumn(id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </th>
          ))}
          <th className={styles.actionWrapperEditing}>
            <Tooltip title="Add new column">
              <IconButton aria-label="Add new column" onClick={ handleAddColumn }>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save changes">
              <IconButton aria-label="Save changes" onClick={ handleSaveColumns }>
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel changes">
              <IconButton aria-label="Cancel changes" onClick={ handleResetColumns }>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </th>
        </>
      );
    } else {
      return (
        <>
          {
            data.columns.map(({ name, id }) => (
              <Tooltip title={ name }>
                <th key={ id } className={styles.column}>{ name }</th>
              </Tooltip>
            ))
          }
          <th className={styles.actionWrapper}>
            <Tooltip title="Remove Table">
              <IconButton
                className="deleteButton"
                aria-label={`Remove Table ${data.name}`}
                onClick={() => showDeleteDialog()}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Table">
              <IconButton
                className="editButton"
                aria-label={`Edit Table ${data.name}`}
                onClick={() => setIsEditColumnMode(true)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </th>
        </>
      );
    }
  };

  return (
    <div className={styles.tablewrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {
              renderColumnHeaders()
            }
          </tr>
        </thead>
        <tbody>
          {
            data.rows?.length ? data.rows.map((row) => (
              <tr key={row.id}>
                {data.columns.map(({ name }) => (
                  <Tooltip title={`${row[name]}`}>
                    <td key={`${row.id}-${name}`}>{row[name]}</td>
                  </Tooltip>
                ))}
                <td>
                  <Tooltip title="Edit Row">
                    <button className={styles.button} aria-label="Edit Row" onClick={() => openEditModal(row)}>Edit</button>
                  </Tooltip>
                  <Tooltip title="Delete Row">
                    <button className={`${styles.button} ${styles.deletebutton}`} aria-label="Delete Row" onClick={() => onDeleteRow(row.id)}>Delete</button>
                  </Tooltip>
                </td>
              </tr>
            )) :
            <tr className={styles.description}>
              <td colSpan={data.columns.length + 1}>No data found in the table</td>
            </tr>
          }
        </tbody>
      </table>
      <button className={styles.button} aria-label="Add New Row" onClick={() => setIsAddModalOpen(true)}>
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
      <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={hideDeleteDialog}
          onConfirm={confirmDeleteTable}
      />
    </div>
  )
};
