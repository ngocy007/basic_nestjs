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
import {
  ApiUsers,
  ApiCreateUser,
  ApiGetAllUsers,
  ApiGetUser,
  ApiUpdateUser,
  ApiDeleteUser,
} from './decorators/api-users.decorator';

@ApiUsers()
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Post()
  @ApiCreateUser()
  create(@Body() dto: CreateUserDto) {
    return this.users.create(dto);
  }

  @Get()
  @ApiGetAllUsers()
  findAll() {
    return this.users.findAll();
  }

  @Get(':id')
  @ApiGetUser()
  findOne(@Param('id') id: string) {
    return this.users.findOne(id);
  }

  @Patch(':id')
  @ApiUpdateUser()
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.users.update(id, dto);
  }

  @Delete(':id')
  @ApiDeleteUser()
  remove(@Param('id') id: string) {
    return this.users.delete(id);
  }
}
