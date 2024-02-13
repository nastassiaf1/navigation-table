import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from 'api/user.service';
import { ILoginForm } from 'interfaces/user';

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit = async (data: ILoginForm) => {
    try {
      await loginUser(data).unwrap();
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name', { required: true })} />
        {errors.name && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password', { required: true })} />
        {errors.password && <span>This field is required</span>}
      </div>
      <button type="submit" disabled={isLoading}>Login</button>
    </form>
  );
}
