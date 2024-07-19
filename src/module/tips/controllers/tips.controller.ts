import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import { TipService } from '../service/tip.service';
import { CreateTipDto } from '../dtos/create-tips.dto';
import { Tip } from '../entities/tips.entities';
import { UpdateTipsDto } from '../dtos/update-tips.dto';

@ApiTags('Tips')
@Controller('tip')
export class TipController {
  constructor(private readonly tipService: TipService) {}

  @Post('new')
  @ApiOperation({ summary: 'Create a new Tip' })
  @ApiResponse({
    status: 201,
    description: 'The Tip has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async create(@Body() createTipDto: CreateTipDto): Promise<Tip> {
    return this.tipService.create(createTipDto);
  }

  @Get('all')
@ApiOperation({ summary: 'Retrieve all Tips' })
@ApiQuery({
  name: 'page',
  required: false,
  type: Number,
  description: 'Page number for pagination. Default: 1',
  example: 1,
})
@ApiQuery({
  name: 'limit',
  required: false,
  type: Number,
  description: 'Number of items per page. Default: 10',
  example: 10,
})
@ApiResponse({ status: 200, description: 'List of all Tips' })
@ApiResponse({ status: 404, description: 'No Tips found.' })
@ApiInternalServerErrorResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Internal server error.',
})
async findAll(
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 10
): Promise<{ data: Tip[]; }> {
  return this.tipService.findAll(page, limit);
}

  @Get('with-filters')
  @ApiOperation({ summary: 'Retrieve Tips with Filters' })
  @ApiQuery({
    name: 'levelId',
    required: false,
    type: Number,
    description: 'Filter by Level ID',
  })
  @ApiQuery({
    name: 'subjectId',
    required: false,
    type: Number,
    description: 'Filter by Subject ID',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination. Default: 1',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page. Default: 10',
    example: 10,
  })
  @ApiResponse({ status: 200, description: 'List of Tips with filters' })
  @ApiResponse({ status: 404, description: 'No Tips found.' })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async findWithFilters(
    @Query('levelId') levelId?: number,
    @Query('subjectId') subjectId?: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<Tip[]> {
    return this.tipService.findWithFilters(levelId, subjectId, page, limit);
  }  

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a Tip by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the Tip' })
  @ApiResponse({ status: 200, description: 'The Tip with the given ID' })
  @ApiResponse({ status: 404, description: 'Tip not found.' })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async findOne(@Param('id') id: number): Promise<Tip> {
    return this.tipService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Tip by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the Tip' })
  @ApiResponse({
    status: 200,
    description: 'The Tip has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Tip not found.' })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateTipsDto: UpdateTipsDto,
  ): Promise<Tip> {
    return this.tipService.update(id, updateTipsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Tip by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the Tip' })
  @ApiResponse({
    status: 204,
    description: 'The Tip has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Tip not found.' })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return this.tipService.delete(id);
  }

}
