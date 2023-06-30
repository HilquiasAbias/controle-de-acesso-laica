import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "./dto/create-user.dto";

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
}