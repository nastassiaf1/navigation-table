import { UserRole } from "constants/user.enum";
import { User } from "interfaces/user";

const mockUsers: User[] = [
    { id: '1', name: 'Tom', role: UserRole.USER, password: '123456' },
    { id: '2', name: 'Anna', role: UserRole.ADMIN, password: '123456' },
];

export default mockUsers;
