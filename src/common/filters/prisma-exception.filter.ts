import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorCode = exception.code;
    const errorMeta = exception.meta;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    switch (errorCode) {
      // Unique constraint violation
      case 'P2002': {
        status = HttpStatus.CONFLICT;
        const fields = errorMeta?.target as string[] | undefined;
        const fieldName = fields?.[0] || 'field';
        message = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} already exists`;
        break;
      }

      // Record not found
      case 'P2025': {
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found';
        break;
      }

      // Foreign key constraint failed
      case 'P2003': {
        status = HttpStatus.BAD_REQUEST;
        const fieldName = errorMeta?.field_name as string | undefined;
        message = fieldName
          ? `Invalid reference: ${fieldName}`
          : 'Foreign key constraint failed';
        break;
      }

      // Required field missing
      case 'P2011': {
        status = HttpStatus.BAD_REQUEST;
        const fieldName = errorMeta?.constraint as string | undefined;
        message = fieldName
          ? `${fieldName} is required`
          : 'Required field is missing';
        break;
      }

      // Invalid value for field
      case 'P2006':
      case 'P2007': {
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid value provided';
        break;
      }

      // Record required but not found (relation)
      case 'P2018': {
        status = HttpStatus.BAD_REQUEST;
        message = 'Required related record not found';
        break;
      }

      // Failed to connect to database
      case 'P1001':
      case 'P1002':
      case 'P1008': {
        status = HttpStatus.SERVICE_UNAVAILABLE;
        message = 'Database connection failed';
        break;
      }

      // Query timeout
      case 'P2024': {
        status = HttpStatus.REQUEST_TIMEOUT;
        message = 'Query timeout';
        break;
      }

      default: {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Database error occurred';
      }
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: exception.code,
      timestamp: new Date().toISOString(),
    });
  }
}
