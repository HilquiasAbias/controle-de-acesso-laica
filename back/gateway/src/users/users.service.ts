import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@Inject('USERS') private readonly usersService: ClientProxy) {}

  create(createUserDto: CreateUserDto) {
    const pattern = { cmd: "create-user" };
    const payload = createUserDto;

    return this.usersService.send(pattern, payload)
  }
}