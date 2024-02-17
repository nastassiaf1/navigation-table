import { useForm, useFieldArray } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

import formStyle from './../../styles/form.module.scss';
import dialogStyle from './../../styles/dialog.module.scss';

interface IColumns {
    columns: {
        name: string
    }[]
}

export default function AddTableModal({ onClose }: { onClose: () => void }) {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IColumns>({
        defaultValues: {
            columns: [{ name: "" }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "columns"
    });

    const handleAddColumn = () => {
        append({ name: "" });
    };

    const onSubmit = (data: IColumns) => {
        const columns = data.columns.map(column => column.name).
            filter(name => name.trim() === '');

        onClose();
    };

    return <div className={dialogStyle.wrapper}>
        <form className={`${formStyle.form} ${dialogStyle.content}`} onSubmit={handleSubmit(onSubmit)}>
            <div className={dialogStyle.cancelbtn}>
                <IconButton aria-label="close create table modal" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div>
                {fields.map((field, index) => (
                    <div key={field.id} className="columnWrapper">
                        <input {...register(`columns.${index}.name`)} className={formStyle.input} />
                        <IconButton
                            aria-label="delete column"
                            onClick={() => remove(index)}
                            className="deleteButton"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))}
            </div>
            <div className={dialogStyle.btncontainer}>
                <button type="button" aria-label="create new column" className={dialogStyle.addbutton} onClick={handleAddColumn}>Add column</button>
                <button type="submit" aria-label="create new table" className={formStyle.savebutton}>Save</button>                
            </div>
        </form>
    </div>
};
