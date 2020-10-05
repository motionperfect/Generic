import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

type HTTPContext = { request: Request, response: Response };

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  private static extractFromContext (host: ArgumentsHost): HTTPContext {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    return { request, response };
  }

  catch (exception: HttpException, host: ArgumentsHost) {
    const { request, response } = HttpExceptionFilter.extractFromContext(host);
    const errors = (exception.getResponse() as any).message;
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      errors: Array.isArray(errors) === false ? [errors] : errors,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
