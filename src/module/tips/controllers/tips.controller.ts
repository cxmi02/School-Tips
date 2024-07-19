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
      name: 'includeDeleted',
      required: false,
      description: 'Include deleted Tips',
      type: Boolean,
    })
    @ApiResponse({ status: 200, description: 'List of all Tips' })
    @ApiResponse({ status: 404, description: 'No Tips found.' })
    @ApiInternalServerErrorResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error.',
    })
    async findAll(
      @Query('includeDeleted') includeDeleted: string,
    ): Promise<Tip[]> {
      const include = includeDeleted === 'true';
      return this.tipService.findAll(include);
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
  