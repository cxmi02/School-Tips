import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tip } from '../entities/tips.entities';
import { Level } from 'src/module/levels/entities/level.entities';
import { Subject } from 'src/module/subjects/entities/subjects.entities';
import { CreateTipDto } from '../dtos/create-tips.dto';
import { UpdateTipsDto } from '../dtos/update-tips.dto';

@Injectable()
export class TipService {
  constructor(
    @InjectRepository(Tip)
    private readonly tipRepository: Repository<Tip>,

    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,

    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(createTipDto: CreateTipDto): Promise<Tip> {
    try {
      const { levelId, subjectId, ...rest } = createTipDto;

      const level = await this.levelRepository.findOneBy({ id: levelId });
      const subject = await this.subjectRepository.findOneBy({ id: subjectId });

      if (!level) {
        throw new HttpException('Level not found', HttpStatus.BAD_REQUEST);
      }
      if (!subject) {
        throw new HttpException('Subject not found', HttpStatus.BAD_REQUEST);
      }

      const existingTip = await this.tipRepository.findOne({
        where: { title: rest.title, isDeleted: false },
      });

      if (existingTip) {
        throw new HttpException(
          'Tip with the same title already exists',
          HttpStatus.CONFLICT,
        );
      }

      const tip = this.tipRepository.create({
        ...rest,
        level,
        subject,
      });

      return await this.tipRepository.save(tip);
    } catch (error) {
      throw new HttpException(
        `Failed to create Tip: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(includeDeleted: boolean = false): Promise<Tip[]> {
    try {
      return await this.tipRepository.find({
        where: includeDeleted ? {} : { isDeleted: false },
        relations: ['level', 'subject'], 
      });
    } catch (error) {
      throw new HttpException(`Failed to find Tips: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Tip> {
    try {
      const tip = await this.tipRepository.findOne({
        where: { id, isDeleted: false },
        relations: ['level', 'subject']
      });

      if (!tip) {
        throw new HttpException('Tip not found', HttpStatus.NOT_FOUND);
      }

      return tip;
    } catch (error) {
      throw new HttpException(`Failed to find Tip: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateTipsDto: UpdateTipsDto): Promise<Tip> {
    try {
      const tip = await this.findOne(id);
      if (!tip) {
        throw new HttpException('Tip not found', HttpStatus.NOT_FOUND);
      }

      const { levelId, subjectId, ...rest } = updateTipsDto;
      Object.assign(tip, rest);

      if (levelId) {
        const level = await this.levelRepository.findOneBy({ id: levelId });
        if (!level) {
          throw new HttpException('Level not found', HttpStatus.BAD_REQUEST);
        }
        tip.level = level;
      }
      if (subjectId) {
        const subject = await this.subjectRepository.findOneBy({ id: subjectId });
        if (!subject) {
          throw new HttpException('Subject not found', HttpStatus.BAD_REQUEST);
        }
        tip.subject = subject;
      }

      return await this.tipRepository.save(tip);
    } catch (error) {
      throw new HttpException(`Failed to update tip: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const tip = await this.findOne(id);
      tip.isDeleted = true;
      await this.tipRepository.save(tip);
    } catch (error) {
      throw new HttpException(`Failed to delete tip: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
