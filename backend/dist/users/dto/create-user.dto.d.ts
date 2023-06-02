export declare class CreateUserDto {
    name: string;
    registration: string;
    password: string;
    role: 'ADMIN' | 'FREQUENTER' | 'ENVIRONMENT-MANAGER';
    tag?: string;
    envId?: string;
}
