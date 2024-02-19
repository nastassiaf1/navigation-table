import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form"
import { useSelector } from "react-redux";
import { useUpdateTableMutation } from "../../api/table.service.";
import { selectCurrentTable } from 'store/selectors/table';
import Spinner from "components/spinner";

import errorStyle from "./../../styles/error.module.scss";
import formStyle from './../../styles/form.module.scss';

export default function EditRowPage() {
    const { rowId } = useParams();
    const navigate = useNavigate();
    const currentTable = useSelector(selectCurrentTable);
    const [updateTable, { isLoading, isError, error }] = useUpdateTableMutation();
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
      const currentRow = currentTable?.rows?.find(row => row.id === rowId);

      if (currentRow) {
        Object.keys(currentRow).forEach(key => {
          setValue(key, currentRow[key]);
        });
      }
    }, [currentTable, rowId, setValue]);

    const onSubmit = async data => {
      try {
        const updatedRows = currentTable?.rows?.map(row => row.id === rowId ? { ...row, ...data } : row);

        if (updatedRows && currentTable) {
            const updatedTable = { ...currentTable, rows: updatedRows };
            await updateTable(updatedTable);
            navigate(`/table/${updatedTable.id}`);
        }
      } catch (err) {
        console.error("Failed to update row:", err);
      }
    };

    if (isLoading) return <Spinner />;

    if (isError) return <div className={errorStyle.error}>Error updating row: {error?.data?.message || "An error occurred"}</div>;

    return (
      <form className={formStyle.form} onSubmit={handleSubmit(onSubmit)}>
        {currentTable?.columns.map(column => (
          <Controller
            key={column}
            name={column}
            control={control}
            render={({ field }) => (
              <div className={formStyle.formItem}>
                <label>{column}</label>
                <input {...field} />
                {errors[column] && <span className={errorStyle.error}>{errors[column].message}</span>}
              </div>
            )}
          />
        ))}
        <button type="submit" className={formStyle.saveButton}>Save</button>
        <button type="button" className={formStyle.cancelButton} onClick={() => navigate(-1)}>Cancel</button>
      </form>
    );
  }
