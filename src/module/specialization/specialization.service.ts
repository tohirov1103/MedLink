import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/module/prisma/prisma.service'; 
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';

@Injectable()
export class SpecializationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSpecializationDto: CreateSpecializationDto) {
    return this.prisma.specialization.create({
      data: {
        name: createSpecializationDto.name,
      },
    });
  }

  async findAll() {
    return this.prisma.specialization.findMany({
    });
  }

  async findOne(id: string) {
    const specialization = await this.prisma.specialization.findUnique({
      where: { id },
    });

    if (!specialization) {
      throw new NotFoundException('Specialization not found');
    }

    return specialization;
  }

  async update(id: string, updateSpecializationDto: UpdateSpecializationDto) {
    return this.prisma.specialization.update({
      where: { id },
      data: {
        name: updateSpecializationDto.name,
      },
    });
  }

  async remove(id: string) {
    const specialization = await this.prisma.specialization.findUnique({
      where: { id },
    });

    if (!specialization) {
      throw new NotFoundException('Specialization not found');
    }

    return this.prisma.specialization.delete({
      where: { id },
    });
  }
}
