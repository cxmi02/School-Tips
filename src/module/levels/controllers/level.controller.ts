import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import { CreateLevelDto } from '../dtos/create-level.dtos';
import { Level } from '../entities/level.entities';
import { LevelService } from '../service/level.service';
import { UpdateLevelDto } from '../dtos/update-level.dto';

@ApiTags('levels')
@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post('new')
  @ApiOperation({ summary: 'Create a new Level' })
  @ApiBody({ type: CreateLevelDto })
  @ApiResponse({
    status: 201,
    description: 'The Level has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async create(@Body() createLevelDto: CreateLevelDto): Promise<Level> {
    return this.levelService.create(createLevelDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Retrieve all Levels' })
  @ApiResponse({ status: 200, description: 'List of all Levels' })
  @ApiResponse({ status: 404, description: 'No Levels found.' })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async findAll(): Promise<Level[]> {
    return this.levelService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a Level by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the Level' })
  @ApiResponse({ status: 200, description: 'The Level with the given ID' })
  @ApiResponse({ status: 404, description: 'Level not found.' })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async findOne(@Param('id') id: number): Promise<Level> {
    const level = await this.levelService.findOne(id);
    if (!level) {
      throw new NotFoundException(`Level with ID ${id} not found`);
    }
    return level;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Level by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the Level' })
  @ApiBody({ type: UpdateLevelDto })
  @ApiResponse({
    status: 200,
    description: 'The Level has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Level not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateLevelDto: UpdateLevelDto,
  ): Promise<Level> {
    return this.levelService.update(id, updateLevelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Level by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the Level' })
  @ApiResponse({
    status: 204,
    description: 'The Level has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Level not found.' })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async remove(@Param('id') id: number): Promise<void> {
    await this.levelService.delete(id);
  }
}
