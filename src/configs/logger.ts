import winston from "winston";

const { combine, timestamp, errors, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp: ts, stack }) => {
  if (stack) {
    return `${ts} ${level}: ${stack}`;
  }
  return `${ts} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(timestamp(), errors({ stack: true }), logFormat),
  transports: [new winston.transports.Console()],
});

if (process.env.NODE_ENV !== "production") {
  logger.format = combine(
    colorize(),
    timestamp(),
    errors({ stack: true }),
    logFormat
  );
}

export default logger;
