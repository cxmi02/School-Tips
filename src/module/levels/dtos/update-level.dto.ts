import { PartialType } from '@nestjs/mapped-types';
import { CreateLevelDto } from './create-level.dtos';

export class UpdateLevelDto extends PartialType(CreateLevelDto) {}
