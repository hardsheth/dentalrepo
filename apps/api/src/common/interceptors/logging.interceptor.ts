import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly appLogger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request & { method: string; url: string }>();
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.appLogger.log(`${req.method} ${req.url} ${Date.now() - start}ms`);
      }),
    );
  }
}
