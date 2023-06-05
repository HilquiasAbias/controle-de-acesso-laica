export declare class CreateUserDto {
    name: string;
    registration: string;
    password: string;
    role: 'ADMIN' | 'FREQUENTER' | 'ENVIRONMENT-MANAGER';
    tag?: string;
    mac?: string;
    envId?: string;
}
