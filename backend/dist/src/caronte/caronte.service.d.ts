import { CreateCaronteDto } from './dto/create-caronte.dto';
import { UpdateCaronteDto } from './dto/update-caronte.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccessTime } from '@prisma/client';
import { ObolForCharonDto } from './dto/obol-caronte.dto';
import { IEnvToFindUser } from 'src/interfaces/env-to-find-user';
import { UserWithAccessTime } from 'src/interfaces/user-with-accesstime';
import { LogService } from 'src/log/log.service';
export declare class CaronteService {
    private readonly prisma;
    private readonly log;
    constructor(prisma: PrismaService, log: LogService);
    create(createCaronteDto: CreateCaronteDto): Promise<import(".prisma/client").Caronte>;
    findAll(): Promise<import(".prisma/client").Caronte[]>;
    findAllByEnvironment(envId: string): Promise<import(".prisma/client").Caronte[]>;
    findOne(id: string): Promise<import(".prisma/client").Caronte>;
    update(id: string, updateCaronteDto: UpdateCaronteDto): Promise<import(".prisma/client").Caronte>;
    remove(id: string): Promise<import(".prisma/client").Caronte>;
    findUserByTag(tag: string, users: IEnvToFindUser): Promise<UserWithAccessTime>;
    findUserByMac(mac: string, users: IEnvToFindUser): Promise<UserWithAccessTime>;
    findUserByData(registration: string, password: string, users: IEnvToFindUser): Promise<UserWithAccessTime>;
    isCurrentTimeValidForUser(accessTimes: AccessTime[]): Promise<boolean>;
    private getDayOfWeek;
    private isTimeWithinRange;
    private getObolType;
    anObolForCharon(obolForCharon: ObolForCharonDto): Promise<{
        access: boolean;
    }>;
}
