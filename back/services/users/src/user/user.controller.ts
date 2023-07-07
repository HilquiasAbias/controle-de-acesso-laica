import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserGeneralDto } from './dto/update-user-general.dto';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
import { UserStatusDto } from './dto/status-user.dto';

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

  @MessagePattern({ cmd: "get-one-for-auth" })
  async findOneForAuth(@Payload() payload: { userId: string }) {
    return await this.userService.findOneForAuth(payload.userId);
  }

  @MessagePattern({ cmd: "get-inactives" })
  async findAllInactive() {
    return await this.userService.findAllInactive();
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

  @MessagePattern({ cmd: "change-user-status" })
  async changeUserStatus(@Payload() payload: { id: string, userStatusDto: UserStatusDto }) {
    const { id, userStatusDto } = payload
    return await this.userService.changeUserStatus(id, userStatusDto);
  }

  /*
  na mensagem(payload) vindo da fila com a api gateway(ou micro front-end) vai ter o token do usuário logado que fez a ação
  os passos seguintes são mandar uma mensagem para o serviço auth para validar o token
  se válido então extrair o id do usuário do token
  para usar na lógica de negócio para possiveis validações ou restrições de autorização
  */
}
