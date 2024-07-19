import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Subject } from '../entities/subjects.entities';
import { CreateSubjectDto } from '../dtos/create-subjects.dtos';
import { UpdateSubjectDto } from '../dtos/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    try {
      const { name } = createSubjectDto;
      const existingSubject = await this.subjectRepository.findOne({
        where: { name },
      });
      if (existingSubject) {
        throw new HttpException(
          `Subject with name ${name} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const subject = this.subjectRepository.create(createSubjectDto);
      return await this.subjectRepository.save(subject);
    } catch (error) {
      throw new HttpException(
        `Failed to create Subject: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Subject[]> {
    try {
      return await this.subjectRepository.find({ where: { isDeleted: false } });
    } catch (error) {
      throw new HttpException(
        `Failed to find Subject: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Subject> {
    try {
      const subject = await this.subjectRepository.findOne({
        where: { id, isDeleted: false },
      });

      if (!subject) {
        throw new NotFoundException(`Subject whith ID ${id} not found`);
      }
      return subject;
    } catch (error) {
      throw new HttpException(
        `Failed to find Subject byId: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    try {
      const subject = await this.findOne(id);
      Object.assign(subject, updateSubjectDto);
      if (!subject) {
        throw new NotFoundException(`Subject whith ID ${id} not found`);
      }
      return await this.subjectRepository.save(subject);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const subject = await this.subjectRepository.findOne({
        where: { id, isDeleted: false },
      });
      if (!subject) {
        throw new NotFoundException(`Subject whith ID ${id} not found`);
      }
      subject.isDeleted = true;
      await this.subjectRepository.save(subject);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
