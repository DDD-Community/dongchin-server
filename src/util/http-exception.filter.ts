import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { CommonResponseDto } from 'src/api/common-response.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }
    const log: CommonResponseDto = new CommonResponseDto(
      (exception as HttpException).getStatus(),
      false,
      (exception as HttpException).message,
    );
    res.status((exception as HttpException).getStatus()).json(log);
  }
}
