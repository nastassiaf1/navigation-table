import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterUserMutation } from 'api/user.service';
import uuidv4 from 'utils/uuid';
import { UserRole } from 'constants/user.enum';

import formStyle from './../../styles/form.module.scss';
import errorStyle from './../../styles/error.module.scss';

interface IRegistrationForm {
  name: string;
  password: string;
  id: string;
}

export default function RegistrationForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<IRegistrationForm>();
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const [userError, setUserError] = useState<string | null>(null);

    const onSubmit = async (data: IRegistrationForm) => {
        try {
            // generated on the client side, since we are using a mock server
            const id = uuidv4();

            await registerUser({ ...data, id, role: UserRole.USER }).unwrap();
            setUserError(null);
        } catch (error) {
            setUserError("Registration failed");
        }
    };

    return (
        <form className={ formStyle.form } onSubmit={handleSubmit(onSubmit)}>
            {userError && <span className={ errorStyle.error }>{ userError }</span>}
            <div className={ formStyle.formitem }>
                <input id="name" placeholder="Name" {...register('name', { required: true })} />
                {errors.name && <span className={`${errorStyle.error} ${formStyle.error}`}>This field is required</span>}
            </div>
            <div className={ formStyle.formitem }>
                <input id="password" placeholder="Password" type="password" {...register('password', { required: true })} />
                {errors.password && <span className={`${errorStyle.error} ${formStyle.error}`}>This field is required</span>}
            </div>
            <button type="submit" className={ formStyle.savebutton } disabled={isLoading}>Register</button>
        </form>
    );
}
