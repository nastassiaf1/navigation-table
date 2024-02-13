import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useSelector } from "react-redux";

import { useUpdateDataMutation, selectUserById } from "../api/table.service.";

import { TableData } from "../interfaces/tableData";
import { maxLengthName, minLengthName } from "../constants/userTable.const";

import errorStyle from "./../styles/error.module.scss";
import formStyle from './../styles/form.module.scss';

export default function EditPage() {
    const errorMessage = 'Failed to update data. Please try again.';

    const navigate = useNavigate();
    const { rowId } = useParams();
    const user = useSelector(state => selectUserById(state, rowId));
    const { control, handleSubmit, formState: { errors } } = useForm();
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
        <form className={ formStyle.form } onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={control}
                defaultValue={user.name || ''}
                rules={{
                    required: 'Name is required',
                    maxLength: { value: maxLengthName, message: 'Name is too long' },
                    minLength: { value: minLengthName, message: 'Name is too short' }
                }}
                render={({ field }) => (
                    <div>
                        <input aria-label="Input user name" {...field} />
                        {errors.name && <span className={`${errorStyle.error} ${formStyle.error}`}>{errors.name.message}</span>}
                    </div>
                )}
            />
            <Controller
                name="age"
                control={control}
                defaultValue={user.age || ''}
                rules={{
                    required: 'Age is required',
                    min: { value: 17, message: 'Minimum age is 17' },
                    max: { value: 99, message: 'Maximum age is 99' }
                }}
                render={({ field }) => (
                    <div>
                        <input type="number" aria-label="Input user age" {...field} />
                        {errors.age && <span className={`${errorStyle.error} ${formStyle.error}`}>{errors.age.message}</span>}
                    </div>
                )}
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
            <button
                type="submit"
                className={formStyle.savebutton}
                aria-label="Save Data"
            >
                Save
            </button>
            <button
                type="button"
                className={formStyle.cancelbutton}
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
