import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { v4 as uuidv4 } from 'uuid';

import { useGetTableDataQuery, useAddDataMutation } from "../api";

import Spinner from "../components/spinner";
import { TableData } from "../interfaces/tableData";
import { maxLengthName, minLengthName } from "../constants/userTable.const";

import errorStyle from './../styles/error.module.scss'


export default function AddPage() {
    const errorMessage = 'Failed to add data. Please try again.';

    const navigate = useNavigate();
    const { control, handleSubmit } = useForm();
    const [addError, setAddError] = useState<string | null>(null);

    const getTableDataQuery = useGetTableDataQuery();
    const [addData, { isLoading }] = useAddDataMutation();

    const onSubmit: SubmitHandler<TableData> = async ({ id, name, age, isVerified }) => {
        try {
            // generated on the client side, since we are using a mock server
            const id = uuidv4();
            const newUser = await addData({ id, name, age, isVerified })

            if (newUser.error) throw new Error(newUser.error);
            await getTableDataQuery.refetch();

            navigate('/table');
            return;
        } catch {
            setAddError(errorMessage);
        }
    }

    if (isLoading) {
        return <Spinner />
    }

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: true, maxLength: maxLengthName, minLength: minLengthName }}
                render={({ field }) => <input aria-label="Input user name" {...field} />}
            />
            <Controller
                name="age"
                control={control}
                defaultValue=""
                rules={{ required: true, min: 17, max: 99 }}
                render={({ field }) => <input type="number" aria-label="Input user age" {...field} />}
            />
            <Controller
                name="isVerified"
                control={control}
                defaultValue={false}
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
            <button type="submit" aria-label="Add user">Save</button>
            <button
                type="button"
                onClick={() => {
                    navigate(-1);
                }}
                aria-label="To previous page"
            >
                Cancel
            </button>
            { addError && <div className={errorStyle.error}>Error updating data: {addError}</div> }
        </form>
      )
}
