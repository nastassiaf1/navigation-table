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
    const { data, error, isLoading } = useGetRowQuery({ id: +rowId! });
    const { control, handleSubmit } = useForm();
    const [updateError, setUpdateError] = useState<string | null>(null);

    const [updateData] = useUpdateDataMutation();
    const getTableDataQuery = useGetTableDataQuery();

    const onSubmit: SubmitHandler<TableData> = async ({ id, name, age, isVerified }) => {
        const updatedData = await updateData({ id: rowId, name, age, isVerified: isVerified.value });

        if (updatedData.error) {
            setUpdateError(errorMessage);

            return;
        }

        await getTableDataQuery.refetch();

        navigate('/table');
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
                    render={({ field }) => <input {...field} />}
                />
                <Controller
                    name="age"
                    control={control}
                    defaultValue={data?.age || ''}
                    rules={{ required: true, min: 17, max: 99 }}
                    render={({ field }) => <input type="number" {...field} />}
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
                                {...field}
                                checked={field.value}
                            />
                            <label htmlFor="isVerified">Verified</label>
                        </div>
                    )}
                />
                <button type="submit">Save</button>
                <button
                    type="button"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Cancel
                </button>
                {updateError && <div className={errorStyle.error}>Error updating data: {updateError}</div>}
            </form> :
        <Spinner />
      )
}
