import { useForm } from 'react-hook-form';
import { useRegisterUserMutation } from 'api/user.service'; // Импортируйте хук из вашего API

interface IRegistrationForm {
  name: string;
  password: string;
  id: string;
}

export default function RegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<IRegistrationForm>();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onSubmit = async (data: IRegistrationForm) => {
    try {
      await registerUser(data).unwrap();
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration failed", error);
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
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email', { required: true })} />
        {errors.email && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password', { required: true })} />
        {errors.password && <span>This field is required</span>}
      </div>
      <button type="submit" disabled={isLoading}>Register</button>
    </form>
  );
}
