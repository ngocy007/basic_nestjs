import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiRegister() {
  return applyDecorators(
    ApiOperation({ summary: 'Register a new user' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User successfully registered',
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'Email already exists',
    }),
  );
}

export function ApiLogin() {
  return applyDecorators(
    ApiOperation({ summary: 'Login with email and password' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Successfully logged in',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Invalid credentials',
    }),
  );
}

export function ApiRefreshToken() {
  return applyDecorators(
    ApiOperation({ summary: 'Refresh access token using refresh token' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Tokens refreshed successfully',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Invalid refresh token',
    }),
  );
}

export function ApiLogout() {
  return applyDecorators(
    ApiOperation({ summary: 'Logout current user' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Successfully logged out',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Unauthorized',
    }),
  );
}
