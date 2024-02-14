import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetUsersQuery } from 'api/user.service';
import { setUser } from 'store/slices/user.slice';
import { ILoginForm } from 'interfaces/user';

import formStyle from './../../styles/form.module.scss';
import errorStyle from './../../styles/error.module.scss';

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
    const [userError, setUserError] = useState<string | null>(null);
    const getUsersQuery = useGetUsersQuery();
    const { data: users, isLoading } = getUsersQuery;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: ILoginForm) => {
        try {
            if (!users?.length) throw new Error();

            const user = users.find((user) => {
                return user.name === data.name;
            });

            if (!user) {
                throw new Error()
            };

            dispatch(setUser(user));
            navigate('/');
        } catch (error) {
            setUserError('Login failed');
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
