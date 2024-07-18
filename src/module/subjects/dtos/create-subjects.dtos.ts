import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    description: 'The name of the Subject.',
    type: String,
    example: 'Ethics and Values',
  })
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'An optional description of the Subject.',
    type: String,
    example:
      'In an ethics and values class, students learn about the moral principles and belief systems that guide behavior and decision-making.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
