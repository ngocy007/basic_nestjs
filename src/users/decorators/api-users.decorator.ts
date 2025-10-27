import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

export const ApiUsers = () =>
  applyDecorators(ApiTags('Users'), ApiBearerAuth('JWT-auth'));

export const ApiCreateUser = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new user' }),
    ApiResponse({
      status: 201,
      description: 'User created successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input data',
    }),
    ApiResponse({
      status: 409,
      description: 'Email already exists',
    }),
  );

export const ApiGetAllUsers = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get all users' }),
    ApiResponse({
      status: 200,
      description: 'List of users retrieved successfully',
    }),
  );

export const ApiGetUser = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get user by ID' }),
    ApiParam({
      name: 'id',
      description: 'User ID (UUID)',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'User retrieved successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'User not found',
    }),
  );

export const ApiUpdateUser = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update user by ID' }),
    ApiParam({
      name: 'id',
      description: 'User ID (UUID)',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'User updated successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'User not found',
    }),
  );

export const ApiDeleteUser = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete user by ID' }),
    ApiParam({
      name: 'id',
      description: 'User ID (UUID)',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'User deleted successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'User not found',
    }),
  );
