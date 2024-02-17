import { useForm, useFieldArray } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

import formStyle from './../../styles/form.module.scss';

export default function AddTableModal({ onClose }: { onClose: () => void }) {
    const { register, control, handleSubmit, formState: { errors } } = useForm({
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

    const onSubmit = (data: any) => {
        console.log(data);
        onClose();
    };

    return <>
        <form className={formStyle.form} onSubmit={handleSubmit(onSubmit)}>
            <IconButton aria-label="close create table modal" onClick={onClose}>
                <CloseIcon />
            </IconButton>
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
            <button type="button" aria-label="create new column" onClick={handleAddColumn}>Add column</button>
            <button type="submit" aria-label="create new table" className={formStyle.savebutton}>Add Table</button>
        </form>
    </>
};
