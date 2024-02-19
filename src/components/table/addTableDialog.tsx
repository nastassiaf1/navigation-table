import { useForm, useFieldArray } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAddTableMutation } from 'api/table.service.';
import uuidv4 from 'utils/uuid';

import formStyle from './../../styles/form.module.scss';
import dialogStyle from './../../styles/dialog.module.scss';

interface ITable {
    tableName: string;
    columns: {
        name: string
    }[]
}

export default function AddTableDialog({ onClose, userId }: { onClose: () => void, userId: string }) {
    const [addTable] = useAddTableMutation();
    const { register, control, handleSubmit, formState: { errors }, watch } = useForm<ITable>({
        defaultValues: {
            columns: [{ name: "" }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "columns"
    });

    const columnNames = watch("columns");

    const isSaveButtonDisabled = fields.length === 1 || columnNames.every(column => column.name.trim() === '');

    const handleAddColumn = () => {
        append({ name: "" });
    };

    const onSubmit = async (data: ITable) => {
        const columns = data.columns.map(column => column.name).
            filter(name => name.trim() !== '');

        const tableData = {
            id: uuidv4(),
            name: data.tableName,
            userId,
            columns
        }

        await addTable(tableData);

        onClose();
    };

    return <div className={dialogStyle.wrapper}>
        <form className={`${formStyle.form} ${dialogStyle.content}`} onSubmit={handleSubmit(onSubmit)}>
            <div className={dialogStyle.cancelbtn}>
                <IconButton aria-label="close create table modal" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div style={{marginBottom: '30px', borderBottom: '1px solid white'}}>
                <input {...register("tableName")} className={formStyle.input} placeholder="Table Name" aria-label="Input Table Name" />
            </div>
            <div>
                {fields.map((field, index) => (
                    <div key={field.id} className="columnWrapper">
                        <input {...register(`columns.${index}.name`)} className={formStyle.input} />
                        <IconButton
                            className="deleteButton"
                            aria-label="delete column"
                            onClick={() => remove(index)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))}
            </div>
            <div className={dialogStyle.btncontainer}>
                <button type="button" aria-label="create new column" className={dialogStyle.addbutton} onClick={handleAddColumn}>Add column</button>
                <button type="submit" aria-label="create new table" className={formStyle.savebutton} disabled={isSaveButtonDisabled}>Save</button>
            </div>
        </form>
    </div>
};
