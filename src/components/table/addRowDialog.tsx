import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import uuidv4 from 'utils/uuid';
import { useUpdateTableMutation } from '../../api/table.service';
import Spinner from '../spinner';
import { selectCurrentTable } from 'store/selectors/table';

import formStyle from './../../styles/form.module.scss';

interface AddRowDialogProps {
    onClose: () => void;
}

export default function AddRowDialog({ onClose }: AddRowDialogProps) {
    const currentTable = useSelector(selectCurrentTable);
    const [updateTable, { isLoading }] = useUpdateTableMutation();
    const { control, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        if (!currentTable) {
            console.error('No current table selected');
            return;
        }

        try {
            const newRow = { ...data, id: uuidv4() };
            await updateTable({ ...currentTable, rows: [...(currentTable.rows || []), newRow] });

            reset();
            onClose();
        } catch (error) {
            console.error('Error adding row:', error);
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (!currentTable) {
        return <div>Please select a table first.</div>;
    }

    return (
        <form className={formStyle.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={formStyle.cancelbutton}>
                <IconButton aria-label="close create table modal" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            {currentTable.columns.map(({name, id}) => (
                <Controller
                    key={id}
                    name={name}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <div className={formStyle.formitem}>
                            <input id={id} {...field} placeholder={name} />
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
