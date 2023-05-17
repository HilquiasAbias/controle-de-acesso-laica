import { Injectable } from '@nestjs/common';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class EnvironmentsService {
  constructor (private readonly prisma: PrismaService) {}

  async create(createEnvironmentDto: CreateEnvironmentDto) {
    const env = await this.prisma.environment.create({
      data: {
        name: createEnvironmentDto.name,
        description: createEnvironmentDto.description,
        admins: createEnvironmentDto.adminId ? { connect: { id: createEnvironmentDto.adminId } } : undefined
      }
    });

    return env
  }

  async createAndAddUser(data, envId: number) {
    const user = await this.prisma.user.create({ // TODO: descobrir como relacionar ambiente com user criado pelo id
      data
    })
  }

  async findAll() {
    return await this.prisma.environment.findMany({
      include: {
        admins: true,
        frequenters: true,
        triggers: true
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.environment.findFirst({
      where: { id },
      include: {
        admins: true,
        frequenters: true,
        triggers: true
      }
    });
  }

  async update(id: number, updateEnvironmentDto: UpdateEnvironmentDto) {
    return await this.prisma.environment.update({
      data: updateEnvironmentDto,
      where: { id }
    });
  }

  async remove(id: number) {
    return await this.prisma.environment.delete({
      where: { id }
    });;
  }
}
