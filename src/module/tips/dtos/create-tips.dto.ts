import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateTipDto {
  @ApiProperty({
    description: 'The title of the Tip.',
    type: String,
    example: 'Be honest and transparent.',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The detailed description of the Tip.',
    type: String,
    example: '  Act with honesty and transparency in all your interactions.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The author of the Tip.',
    type: String,
    example: 'Anonimo',
  })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({
    description: 'The ID of the level associated with the Tip.',
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  levelId: number;

  @ApiProperty({
    description: 'The ID of the subject associated with the Tip.',
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  subjectId: number;
}
