import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Level } from '../entities/level.entities';
import { CreateLevelDto } from '../dtos/create-level.dtos';
import { UpdateLevelDto } from '../dtos/update-level.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}

  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    try {
      const { name } = createLevelDto;
      const existingLevel = await this.levelRepository.findOne({
        where: { name },
      });
      if (existingLevel) {
        throw new HttpException(
          `Level with name ${name} already exists`,
          HttpStatus.CONFLICT,
        );
      }

      const level = this.levelRepository.create(createLevelDto);
      return await this.levelRepository.save(level);
    } catch (error) {
      throw new HttpException(
        `Failed to create Level: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Level[]> {
    try {
      return await this.levelRepository.find({ where: { isDeleted: false } });
    } catch (error) {
      throw new HttpException(
        `Failed to find Levels: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Level> {
    try {
      const level = await this.levelRepository.findOne({
        where: { id, isDeleted: false },
      });

      if (!level) {
        throw new NotFoundException(`Level whith ID ${id} not found`);
      }
      return level;
    } catch (error) {
      throw new HttpException(
        `Failed to find Level byId: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateLevelDto: UpdateLevelDto): Promise<Level> {
    try {
      const level = await this.findOne(id);
      Object.assign(level, updateLevelDto);
      if (!level) {
        throw new NotFoundException(`Level whith ID ${id} not found`);
      }
      return await this.levelRepository.save(level);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const level = await this.levelRepository.findOne({
        where: { id, isDeleted: false },
      });
      if (!level) {
        throw new NotFoundException(`Level whith ID ${id} not found`);
      }
      level.isDeleted = true;
      await this.levelRepository.save(level);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
