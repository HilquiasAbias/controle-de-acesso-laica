import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserGeneralDto } from './dto/update-user-general.dto';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';

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

  @MessagePattern({ cmd: "get-one" })
  async findOne(@Payload() id: string) {
    return await this.userService.findOne(id);
  }

  @MessagePattern({ cmd: "update-general-data" })
  async updateGeneralData(
    @Payload() payload: { id: string, updateUserGeneralDto: UpdateUserGeneralDto }
  ) {
    const { id, updateUserGeneralDto } = payload
    return await this.userService.updateGeneralData(id, updateUserGeneralDto)
  }

  @MessagePattern({ cmd: "update-roles-data" })
  async updateRolesData(
    @Payload() payload: { id: string, updateUserRolesDto: UpdateUserRolesDto }
  ) {
    const { id, updateUserRolesDto } = payload
    return await this.userService.updateRolesData(id, updateUserRolesDto)
  }
}
