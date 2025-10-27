import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiHealthCheck() {
  return applyDecorators(
    ApiOperation({ summary: 'Check application health' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Application is healthy',
    }),
    ApiResponse({
      status: HttpStatus.SERVICE_UNAVAILABLE,
      description: 'Application is unhealthy',
    }),
  );
}

export function ApiHealthReady() {
  return applyDecorators(
    ApiOperation({ summary: 'Check if application is ready' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Application is ready',
    }),
  );
}

export function ApiHealthLive() {
  return applyDecorators(
    ApiOperation({ summary: 'Check if application is live' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Application is live',
    }),
  );
}
