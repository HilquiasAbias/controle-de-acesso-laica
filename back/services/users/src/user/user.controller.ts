import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: "create-user" })
  async create(@Payload() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @MessagePattern({ cmd: "get-environment_managers" })
  async findAllEnvironmentManager() {
    return await this.userService.findAllEnvironmentManager();
  }

  @MessagePattern({ cmd: "get-admins" })
  async findAllAdmins() {
    return await this.userService.findAllAdmins();
  }

  @MessagePattern({ cmd: "get-frequenters" })
  async findAllFrequenters() {
    return await this.userService.findAllFrequenters();
  }
}
