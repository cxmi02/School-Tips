import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateLevelDto {
  @ApiProperty({
    description: 'The name of the Level.',
    type: String,
    example: 'High level',
  })
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'An optional description of the Level.',
    type: String,
    example: 'Level for students with high knowledge.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
