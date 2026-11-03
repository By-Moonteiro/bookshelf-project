import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const body =
        typeof exceptionResponse === "string"
          ? { message: exceptionResponse }
          : exceptionResponse;

      httpAdapter.reply(
        response,
        {
          ...(typeof body === "object" && body !== null ? body : {}),
          statusCode: status,
          timestamp: new Date().toISOString(),
        },
        status,
      );

      return;
    }

    const message =
      exception instanceof Error ? exception.message : "Unhandled exception";
    const stack = exception instanceof Error ? exception.stack : undefined;

    this.logger.error(message, stack);

    httpAdapter.reply(
      response,
      {
        statusCode: 500,
        timestamp: new Date().toISOString(),
        message: "Internal server error",
      },
      500,
    );
  }
}
