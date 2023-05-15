import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Bluetooth, Tag, User } from '@prisma/client';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );
    
    let user: User
    let tag: Tag
    let bluetooth: Bluetooth

    try {
      if (createUserDto.tag) {
        tag = await this.prisma.tag.create({ 
          data: { content: createUserDto.tag }
        }) 
      }

      if (createUserDto.bluetooth) {
        bluetooth = await this.prisma.bluetooth.create({ 
          data: { content: createUserDto.bluetooth }
        }) 
      }

      user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          tag: createUserDto.tag ? { connect: { id: tag.id } } : undefined, // ou null
          bluetooth: createUserDto.bluetooth ? { connect: { id: bluetooth.id } } : undefined, // ou null
          password: hashedPassword
        },
      });

      return user;
    } catch (error) {
      // Tratar erros específicos do Prisma, como por exemplo, violações de constraints ou índices.
      // Aqui, estamos lançando um erro genérico, mas é possível criar erros mais específicos conforme a necessidade.
      throw new Error('Erro ao criar usuário.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany({
        include: {
          adminEnvironment: true,
          frequenterEnvironment: true,
          tag: true,
          bluetooth: true
        }
      });
    } catch (error) {
      // Tratar erros específicos do Prisma, como por exemplo, conexões com o banco de dados.
      throw new Error('Erro ao buscar usuários.');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findFirst({ 
        where: { id },
        include: {
          adminEnvironment: true,
          frequenterEnvironment: true,
          tag: true,
          bluetooth: true
        }
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      return user;
    } catch (error) {
      // Tratar erros específicos do Prisma, como por exemplo, conexões com o banco de dados.
      throw new Error('Erro ao buscar usuário.');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { tag: true, bluetooth: true },
    });
    
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    let tag: Tag | undefined;
    let bluetooth: Bluetooth | undefined;

    if (updateUserDto.tag) {
      if (!user.tag) {
        tag = await this.prisma.tag.create({
          data: { content: updateUserDto.tag },
        });
      } else {
        tag = await this.prisma.tag.update({
          where: { id: user.tag.id },
          data: { content: updateUserDto.tag },
        });
      }
    }

    if (!tag) {
      throw new HttpException("Can't update tag.", HttpStatus.FORBIDDEN);
    }


    if (updateUserDto.bluetooth) {
      if (!user.bluetooth) {
        bluetooth = await this.prisma.bluetooth.create({
          data: { content: updateUserDto.bluetooth },
        });
      } else {
        bluetooth = await this.prisma.bluetooth.update({
          where: { id: user.bluetooth.id },
          data: { content: updateUserDto.bluetooth },
        });
      }
    }

    if (!bluetooth) {
      throw new HttpException("Can't update bluetooth.", HttpStatus.FORBIDDEN);
    }

    const updatedUser = await this.prisma.user.update({
      data: {
        ...updateUserDto,
        tag: tag ? { connect: { id: tag.id } } : undefined,
        bluetooth: bluetooth ? { connect: { id: bluetooth.id } } : undefined,
      },
      where: { id }
    });

    if (!updatedUser) {
      throw new HttpException("Can't update user.", HttpStatus.FORBIDDEN);
    }

    return updatedUser;
  }

  async remove(id: number) {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id }
      });

      if (!deletedUser) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      return deletedUser;
    } catch (error) {
      // Tratar erros específicos do Prisma, como por exemplo, conexões com o banco de dados.
      throw new Error('Erro ao deletar usuário.');
    }
  }
}
