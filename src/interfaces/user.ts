import { UserRole } from "constants/user.enum";

export interface User {
    id: string,
    name: string,
    role: UserRole,
    password?: string
}

export type ILoginForm = Pick<User, 'name' | 'password'>;
// id on the client side, since we are using a fake server
export type IRegistrationForm = Pick<User, 'name' | 'password' | 'id'>;
