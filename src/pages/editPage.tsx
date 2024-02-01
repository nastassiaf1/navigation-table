import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useSelector } from "react-redux";

import { useUpdateDataMutation, selectUserById } from "../api";

import { TableData } from "../interfaces/tableData";
import { maxLengthName, minLengthName } from "../constants/userTable.const";

import errorStyle from "./../styles/error.module.scss";

export default function EditPage() {
    const errorMessage = 'Failed to update data. Please try again.';

    const navigate = useNavigate();
    const { rowId } = useParams();
    const user = useSelector(state => selectUserById(state, rowId));
    const { control, handleSubmit } = useForm();
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [updateData] = useUpdateDataMutation();

    const onSubmit: SubmitHandler<TableData> = async ({ name, age, isVerified }) => {
        try {
            await updateData({ id: rowId, name, age, isVerified });

            navigate('/table');
            return;
        } catch {
            setUpdateError(errorMessage);
        }
    }

    return (
        user ?
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={control}
                defaultValue={user.name || ''}
                rules={{ required: true, maxLength: maxLengthName, minLength: minLengthName }}
                render={({ field }) => <input aria-label="Input user name" {...field} />}
            />
            <Controller
                name="age"
                control={control}
                defaultValue={user.age || ''}
                rules={{ required: true, min: 17, max: 99 }}
                render={({ field }) => <input type="number" aria-label="Input user age" {...field} />}
            />
            <Controller
                name="isVerified"
                control={control}
                defaultValue={user.isVerified || ''}
                render={({ field }) => (
                    <div>
                        <input
                            type="checkbox"
                            id="isVerified"
                            aria-label={field.value ? 'Verified' : 'Not verified'}
                            {...field}
                            checked={field.value}
                        />
                        <label htmlFor="isVerified">Verified</label>
                    </div>
                )}
            />
            <button type="submit" aria-label="Save Data">Save</button>
            <button
                type="button"
                aria-label="To previous page"
                onClick={() => {
                    navigate(-1);
                }}
            >
                Cancel
            </button>
            {updateError && <div className={errorStyle.error}>Error updating data: {updateError}</div>}
        </form> :
        <div className={errorStyle.error}>Error loading data</div>
      )
}
