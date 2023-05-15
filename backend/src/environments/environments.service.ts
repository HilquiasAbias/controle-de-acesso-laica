import { Injectable } from '@nestjs/common';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EnvironmentsService {
  constructor (private readonly prisma: PrismaService) {}

  create(createEnvironmentDto: CreateEnvironmentDto) {
    return this.prisma.environment.create({
      data: createEnvironmentDto
    });
  }

  findAll() {
    return this.prisma.environment.findMany({
      include: {
        admins: true,
        frequenters: true,
        triggers: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.environment.findFirst({
      where: { id },
      include: {
        admins: true,
        frequenters: true,
        triggers: true
      }
    });
  }

  update(id: number, updateEnvironmentDto: UpdateEnvironmentDto) {
    return this.prisma.environment.update({
      data: updateEnvironmentDto,
      where: { id }
    });
  }

  remove(id: number) {
    return this.prisma.environment.delete({
      where: { id }
    });;
  }
}
