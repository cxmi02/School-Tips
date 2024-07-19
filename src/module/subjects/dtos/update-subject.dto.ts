import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectDto } from './create-subjects.dtos';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {}
