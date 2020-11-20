import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { HttpExceptionFilter } from '../../../app/filter';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(QueryExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const { request, response } = HttpExceptionFilter.extractFromContext(host);
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(exception.message);
    response.status(status).json({
      statusCode: status,
      errors: ['Unknown error occurred.'],
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
