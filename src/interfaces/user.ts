import { UserRole } from "constants/user.enum";

export interface User {
    id: string,
    name: string,
    role: UserRole,
    password?: string
}
