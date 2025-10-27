import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Post() create(@Body() dto: CreateUserDto) {
    return this.users.create(dto);
  }
  @Get() findAll() {
    return this.users.findAll();
  }
  @Get(':id') findOne(@Param('id') id: string) {
    return this.users.findOne(id);
  }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.users.update(id, dto);
  }
  @Delete(':id') remove(@Param('id') id: string) {
    return this.users.delete(id);
  }
}
