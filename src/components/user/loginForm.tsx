import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userApi } from 'api/user.service';
import { setUser } from 'store/slices/user.slice';
import { ILoginForm } from 'interfaces/user';

import formStyle from './../../styles/form.module.scss';
import errorStyle from './../../styles/error.module.scss';

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
    const [userError, setUserError] = useState<string | null>(null);
    // login imitation
    const [trigger, { isLoading }] = userApi.endpoints.getUserByNameAndPassword.useLazyQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: ILoginForm) => {
        try {
            const result = await trigger(data);

            if (result.data) {
                sessionStorage.setItem('user', JSON.stringify(result.data));

                dispatch(setUser(result.data));
                navigate('/');
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            setUserError('Login failed. Please try again.');
        }
    };

    return (
        <form className={ formStyle.form } onSubmit={ handleSubmit(onSubmit) }>
            {userError && <span className={ errorStyle.error }>{ userError }</span>}
            <div className={ formStyle.formitem }>
                <input id="name" placeholder="Name" {...register('name', { required: true })} />
                { errors.name && <span className={`${errorStyle.error} ${formStyle.error}`}>This field is required</span> }
            </div>
            <div className={ formStyle.formitem }>
                <input id="password" placeholder="Password" type="password" {...register('password', { required: true })} />
                { errors.password && <span className={`${errorStyle.error} ${formStyle.error}`}>This field is required</span> }
            </div>
            <button type="submit" className={ formStyle.savebutton } disabled={ isLoading }>Login</button>
        </form>
    );
}
