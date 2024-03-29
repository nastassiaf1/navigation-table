import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import { useUpdateTableMutation } from '../../api/table.service';
import { selectCurrentTable } from 'store/selectors/table';
import { TableRow } from 'interfaces/table';
import Spinner from 'components/spinner';

import errorStyle from './../../styles/error.module.scss';
import formStyle from './../../styles/form.module.scss';

interface EditRowDialogProps {
  row: TableRow;
  onClose: () => void;
}

export default function EditRowDialog({ row, onClose }: EditRowDialogProps) {
    const currentTable = useSelector(selectCurrentTable);
    const [updateTable, { isLoading, isError, error }] = useUpdateTableMutation();
    const { control, handleSubmit, setValue } = useForm();

    useEffect(() => {
      if (row) {
        Object.keys(row).forEach(key => {
          setValue(key, row[key]);
        });
      }
    }, [row, setValue]);

    const onSubmit = async data => {
      try {
        const updatedRows = currentTable?.rows?.map(currentRow => currentRow.id === row.id ? { ...currentRow, ...data } : currentRow);

        if (updatedRows && currentTable) {
            const updatedTable = { ...currentTable, rows: updatedRows };
            await updateTable(updatedTable);
            onClose();
        }
      } catch (err) {
        console.error("Failed to update row:", err);
      }
    };

    if (isLoading) return <Spinner />;

    if (isError) return <div className={errorStyle.error}>Error updating row: {error?.data?.message || "An error occurred"}</div>;

    return (
      <form className={formStyle.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={formStyle.cancelbutton}>
          <Tooltip title="Close Modal">
            <IconButton aria-label="Close Create Table Modal" onClick={onClose}>
                <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
        {currentTable?.columns.map(({ name, id }) => (
          <Controller
            key={id}
            name={name}
            control={control}
            render={({ field }) => (
              <div className={formStyle.formItem}>
                <label className={formStyle.label} htmlFor={id}>{ name }</label>
                <input id={id} {...field} />
              </div>
            )}
          />
        ))}
        <div className={formStyle.btncontainer}>
          <button type="submit" className={formStyle.confirmbutton}>Save</button>
        </div>
      </form>
    );
}
