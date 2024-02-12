import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { useAddDataMutation } from '../api';

import Spinner from '../components/spinner';
import { TableData } from '../interfaces/tableData';
import { maxLengthName, minLengthName } from '../constants/userTable.const';

import errorStyle from './../styles/error.module.scss';
import formStyle from './../styles/form.module.scss';


export default function AddPage() {
    const errorMessage = 'Failed to add data. Please try again.';

    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [addError, setAddError] = useState<string | null>(null);
    const [addData, { isLoading }] = useAddDataMutation();

    const onSubmit: SubmitHandler<TableData> = async ({ id, name, age, isVerified }) => {
        try {
            // generated on the client side, since we are using a mock server
            const id = uuidv4();
            const newUser = await addData({ id, name, age, isVerified })

            if (newUser.error) throw new Error(newUser.error);

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
        <form className={ formStyle.form } onSubmit={ handleSubmit(onSubmit) }>
            <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                    required: 'Name is required',
                    maxLength: {
                        value: maxLengthName,
                        message: 'Name is too long'
                    },
                    minLength: {
                        value: minLengthName,
                        message: 'Name is too short'
                    }
                }}
                render={({ field }) => (
                    <div className={ formStyle.formitem }>
                        <input placeholder="Enter name" aria-label="Input user name" {...field} />
                        {errors.name && <span className={`${errorStyle.error} ${formStyle.error}`}>{errors.name.message}</span>}
                    </div>
                )}
            />
            <Controller
                name="age"
                control={control}
                defaultValue=""
                rules={{ required: 'Age is required', min: { value: 17, message: 'Minimum age is 17' }, max: { value: 99, message: 'Maximum age is 99' } }}
                render={({ field }) => (
                    <div className={ formStyle.formitem }>
                        <input placeholder="Enter age" type="number" aria-label="Input user age" {...field} />
                        {errors.age && <span className={`${errorStyle.error} ${formStyle.error}`}>{errors.age.message}</span>}
                    </div>
                )}
            />
            <Controller
                name="isVerified"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                    <div className={ formStyle.formitem }>
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
                disabled={Object.keys(errors).length > 0}
                aria-label="Add user"
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
            { addError && <div className={errorStyle.error}>Error updating data: {addError}</div> }
        </form>
      )
}
