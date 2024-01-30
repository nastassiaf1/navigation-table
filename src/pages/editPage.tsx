import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form"

import { useGetRowQuery, useGetTableDataQuery, useUpdateDataMutation } from "../api";

import Spinner from "../components/spinner";
import { TableData } from "../interfaces/tableData";
import { maxLengthName, minLengthName } from "../constants/userTable.const";

import errorStyle from './../styles/error.module.scss'


export default function EditPage() {
    const errorMessage = 'Failed to update data. Please try again.';

    const navigate = useNavigate();
    const { rowId } = useParams();
    const { data, error, isLoading } = useGetRowQuery({ id: rowId! });
    const { control, handleSubmit } = useForm();
    const [updateError, setUpdateError] = useState<string | null>(null);

    const [updateData] = useUpdateDataMutation();
    const getTableDataQuery = useGetTableDataQuery();

    const onSubmit: SubmitHandler<TableData> = async ({ name, age, isVerified }) => {
        try {
            await updateData({ id: rowId, name, age, isVerified });
            await getTableDataQuery.refetch();

            navigate('/table');
            return;
        } catch {
            setUpdateError(errorMessage);
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

      return (
        data ?
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue={data?.name || ''}
                    rules={{ required: true, maxLength: maxLengthName, minLength: minLengthName }}
                    render={({ field }) => <input aria-label="Input user name" {...field} />}
                />
                <Controller
                    name="age"
                    control={control}
                    defaultValue={data?.age || ''}
                    rules={{ required: true, min: 17, max: 99 }}
                    render={({ field }) => <input type="number" aria-label="Input user age" {...field} />}
                />
                <Controller
                    name="isVerified"
                    control={control}
                    defaultValue={data?.isVerified || ''}
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
                    onClick={() => {
                        navigate(-1);
                    }}
                    aria-label="To previous page"
                >
                    Cancel
                </button>
                {updateError && <div className={errorStyle.error}>Error updating data: {updateError}</div>}
            </form> :
        <Spinner />
      )
}
