import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserGeneralDto } from "./dto/update-user-general.dto";
import { UpdateUserRolesDto } from "./dto/update-user-roles.dto";
import { isUUID } from "class-validator";

@Injectable()
export class UsersService {
  constructor(@Inject('USERS') private readonly usersService: ClientProxy) {}

  create(createUserDto: CreateUserDto) {
    const pattern = { cmd: 'create-user' };
    const payload = createUserDto;

    return this.usersService.send(pattern, payload)
  }

  findAllFrequenters() {
    const pattern = { cmd: 'get-frequenters' }
    const payload = {}
    
    return this.usersService.send(pattern, payload)
  }

  findAllAdmins() {
    const pattern = { cmd: 'get-admins' }
    const payload = {}
    
    return this.usersService.send(pattern, payload)
  }

  findAllEnvironmentManager() {
    const pattern = { cmd: 'get-environment_managers' }
    const payload = {}
    
    return this.usersService.send(pattern, payload)
  }

  findOne(id: string) {
    const pattern = { cmd: 'get-one' }
    const payload = id
    
    return this.usersService.send(pattern, payload)
  }

  updateGeneralData(id: string, updateUserGeneralDto: UpdateUserGeneralDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid id input')
    }

    console.log(updateUserGeneralDto);

    const validFields = ['email', 'name', 'registration', 'password'];
    const invalidFields = Object.keys(updateUserGeneralDto).filter(
      field => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new BadRequestException(`Invalid fields provided: ${invalidFields.join(', ')}`)
    }

    

    const pattern = { cmd: "update-general-data" }
    const payload = { id, updateUserGeneralDto }

    return this.usersService.send(pattern, payload)
  }

  updateRoles(id: string, updateUserRolesDto: UpdateUserRolesDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid id input')
    }

    const validFields = ['rolesToAdd', 'rolesToRemove'];
    const invalidFields = Object.keys(updateUserRolesDto).filter(
      field => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new BadRequestException(`Invalid fields provided: ${invalidFields.join(', ')}`)
    }

    const pattern = { cmd: "update-roles-data" }
    const payload = { id, updateUserRolesDto }

    return this.usersService.send(pattern, payload)
  }
}