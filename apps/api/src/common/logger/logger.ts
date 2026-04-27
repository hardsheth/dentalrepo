import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import LokiTransport from 'winston-loki';

const lokiHost = process.env.LOKI_HOST;
const level = process.env.LOG_LEVEL ?? 'info';

export const structuredLogger = winston.createLogger({
  level,
  defaultMeta: { app: 'dental-clinic-api' },
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console(),
    ...(lokiHost
      ? [
          new LokiTransport({
            host: lokiHost,
            labels: { app: 'dental-clinic-api' },
            json: true,
          }),
        ]
      : []),
  ],
});

export const logger: LoggerService = {
  log: (message, context) => structuredLogger.info(message, { context }),
  error: (message, trace, context) => structuredLogger.error(message, { trace, context }),
  warn: (message, context) => structuredLogger.warn(message, { context }),
  debug: (message, context) => structuredLogger.debug(message, { context }),
  verbose: (message, context) => structuredLogger.verbose(message, { context }),
};
