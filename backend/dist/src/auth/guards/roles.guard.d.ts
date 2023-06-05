import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class RolesGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    matchRoles(roles: string[], userRole: string): boolean;
    canActivate(context: ExecutionContext): boolean;
}
