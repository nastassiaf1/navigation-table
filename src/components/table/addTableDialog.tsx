import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { useAddTableMutation } from 'api/table.service';
import uuidv4 from 'utils/uuid';

import formStyle from './../../styles/form.module.scss';
import errorStyle from './../../styles/error.module.scss';

enum NewTableFieldsName {
    COLUMNS = 'columns',
    TABLE_NAME = 'tableName'
}

interface NewTable {
    [NewTableFieldsName.TABLE_NAME]: string;
    [NewTableFieldsName.COLUMNS]: {
        name: string
    }[]
}

export default function AddTableDialog({ onClose, userId }: { onClose: () => void, userId: string }) {
    const [addTable] = useAddTableMutation();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { register, control, handleSubmit, watch } = useForm<NewTable>({
        defaultValues: {
            [NewTableFieldsName.COLUMNS]: [{ name: "" }],
            [NewTableFieldsName.TABLE_NAME]: ""
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: NewTableFieldsName.COLUMNS
    });

    const columnNames = watch(NewTableFieldsName.COLUMNS);
    const tableName = watch(NewTableFieldsName.TABLE_NAME);

    const isSaveButtonDisabled = fields.length === 1 ||
        columnNames.some(column => column.name.trim() === '') ||
        !tableName.trim().length;

    const handleAddColumn = () => {
        append({ name: "" });
    };

    const onSubmit = async (data: NewTable) => {
        const columns = data.columns
            .map(column => ({ name: column.name.trim(), id: uuidv4() }))
            .filter(({ name }) => name !== '');

        const uniqueColumnNames = new Set(columns.map(({ name }) => name));

        if (uniqueColumnNames.size < columns.length) {
            setError("Column names must be unique.");
            return;
        }

        setError("");

        const tableData = {
            id: uuidv4(), // id on the client side, since we are simulating a server
            name: data.tableName,
            userId,
            columns,
        }

        await addTable(tableData);
        navigate(`/table/${tableData.id}`, { replace: true });

        onClose();
    };

    return <form className={formStyle.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={formStyle.cancelbutton}>
            <Tooltip title="Close Modal">
                <IconButton aria-label="close create table modal" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Tooltip>
        </div>
        <div style={{marginBottom: '30px', borderBottom: '1px solid white'}}>
            <input {...register(NewTableFieldsName.TABLE_NAME)} className={formStyle.input} placeholder="Table Name" aria-label="Input Table Name" />
        </div>
        <div>
            {fields.map((field, index) => (
                <div key={field.id} className="columnWrapper">
                    <input {...register(`${NewTableFieldsName.COLUMNS}.${index}.name`)} className={formStyle.input} />
                    <Tooltip title="Delete Column">
                        <IconButton
                            className="deleteButton"
                            aria-label="Delete Column"
                            onClick={() => remove(index)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ))}
        </div>
        {
            error && <div className={errorStyle.error}>{error}</div>
        }
        <div className={formStyle.btncontainer}>
            <button type="button" aria-label="create new column" className={formStyle.addbutton} onClick={handleAddColumn}>Add column</button>
            <button type="submit" aria-label="create new table" className={formStyle.confirmbutton} disabled={isSaveButtonDisabled}>Save</button>
        </div>
    </form>
};
