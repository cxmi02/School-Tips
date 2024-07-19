import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBody,
    ApiInternalServerErrorResponse,
  } from '@nestjs/swagger';
  
  import { CreateSubjectDto } from '../dtos/create-subjects.dtos';
  import { SubjectsService } from '../service/subjects.service';
  import { Subject } from '../entities/subjects.entities';
  import { UpdateSubjectDto } from '../dtos/update-subject.dto';
  
  @ApiTags('subjects')
  @Controller('subject')
  export class SubjectController {
    constructor(private readonly subjectService: SubjectsService) {}
  
    @Post('new')
    @ApiOperation({ summary: 'Create a new Subject' })
    @ApiBody({ type: CreateSubjectDto })
    @ApiResponse({
      status: 201,
      description: 'The Subject has been successfully created.',
    })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiInternalServerErrorResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error.',
    })
    async create(@Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
      return this.subjectService.create(createSubjectDto);
    }
  
    @Get('all')
    @ApiOperation({ summary: 'Retrieve all Subjects' })
    @ApiResponse({ status: 200, description: 'List of all Subjects' })
    @ApiResponse({ status: 404, description: 'No Subjects found.' })
    @ApiInternalServerErrorResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error.',
    })
    async findAll(): Promise<Subject[]> {
      return this.subjectService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a Subject by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID of the Subject' })
    @ApiResponse({ status: 200, description: 'The Subject with the given ID' })
    @ApiResponse({ status: 404, description: 'Subject not found.' })
    @ApiInternalServerErrorResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error.',
    })
    async findOne(@Param('id') id: number): Promise<Subject> {
      const subject = await this.subjectService.findOne(id);
      if (!subject) {
        throw new NotFoundException(`Subject with ID ${id} not found`);
      }
      return subject;
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update a Subject by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID of the Subject' })
    @ApiBody({ type: UpdateSubjectDto })
    @ApiResponse({
      status: 200,
      description: 'The Subject has been successfully updated.',
    })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiResponse({ status: 404, description: 'Subject not found.' })
    @ApiInternalServerErrorResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error.',
    })
    async update(
      @Param('id') id: number,
      @Body() updateSubjectDto: UpdateSubjectDto,
    ): Promise<Subject> {
      return this.subjectService.update(id, updateSubjectDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Subject by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID of the Subject' })
    @ApiResponse({
      status: 204,
      description: 'The Subject has been successfully deleted.',
    })
    @ApiResponse({ status: 404, description: 'Subject not found.' })
    @ApiInternalServerErrorResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error.',
    })
    async remove(@Param('id') id: number): Promise<void> {
      await this.subjectService.delete(id);
    }
  }
  