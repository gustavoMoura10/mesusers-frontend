export interface User {
    id: number;
    username: string;
    email: string;
    password?: string;
    admin: boolean;
    createdById?: number;
}