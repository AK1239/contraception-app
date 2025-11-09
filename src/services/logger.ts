/**
 * Centralized logging service
 * Provides environment-based logging with different levels
 * In production, only errors are logged to prevent performance issues
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
  stack?: string;
}

class Logger {
  private logLevel: LogLevel;
  private logs: LogEntry[] = [];
  private maxLogs = 100; // Keep last 100 logs in memory

  constructor() {
    // Determine log level based on environment
    // In development, log everything. In production, only errors
    this.logLevel = __DEV__ ? LogLevel.DEBUG : LogLevel.ERROR;
  }

  /**
   * Set the log level
   */
  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  /**
   * Add log entry
   */
  private addLog(level: LogLevel, message: string, data?: any, error?: Error): void {
    if (level < this.logLevel) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data: data ? (typeof data === 'object' ? JSON.stringify(data, null, 2) : data) : undefined,
      stack: error?.stack,
    };

    // Keep only last maxLogs entries
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Output to console based on level and environment
    if (__DEV__) {
      switch (level) {
        case LogLevel.DEBUG:
          console.log(`[DEBUG] ${message}`, data || '');
          break;
        case LogLevel.INFO:
          console.info(`[INFO] ${message}`, data || '');
          break;
        case LogLevel.WARN:
          console.warn(`[WARN] ${message}`, data || '');
          break;
        case LogLevel.ERROR:
          console.error(`[ERROR] ${message}`, error || data || '');
          if (error?.stack) {
            console.error('Stack trace:', error.stack);
          }
          break;
      }
    } else {
      // In production, only log errors
      if (level === LogLevel.ERROR) {
        // In production, you might want to send this to a logging service
        // For now, we'll just keep it in memory
        console.error(`[ERROR] ${message}`, error || data || '');
      }
    }
  }

  /**
   * Log debug message
   */
  debug(message: string, data?: any): void {
    this.addLog(LogLevel.DEBUG, message, data);
  }

  /**
   * Log info message
   */
  info(message: string, data?: any): void {
    this.addLog(LogLevel.INFO, message, data);
  }

  /**
   * Log warning message
   */
  warn(message: string, data?: any): void {
    this.addLog(LogLevel.WARN, message, data);
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error | any, data?: any): void {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    this.addLog(LogLevel.ERROR, message, data, errorObj);
  }

  /**
   * Get recent logs
   */
  getLogs(level?: LogLevel): LogEntry[] {
    if (level !== undefined) {
      return this.logs.filter((log) => log.level >= level);
    }
    return [...this.logs];
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Get logs as string (useful for reporting)
   */
  getLogsAsString(level?: LogLevel): string {
    const logs = level !== undefined 
      ? this.logs.filter((log) => log.level >= level)
      : this.logs;
    
    return logs
      .map((log) => {
        const levelName = LogLevel[log.level];
        return `[${log.timestamp}] ${levelName}: ${log.message}${
          log.data ? `\nData: ${log.data}` : ''
        }${log.stack ? `\nStack: ${log.stack}` : ''}`;
      })
      .join('\n\n');
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience functions
export const logDebug = (message: string, data?: any) => logger.debug(message, data);
export const logInfo = (message: string, data?: any) => logger.info(message, data);
export const logWarn = (message: string, data?: any) => logger.warn(message, data);
export const logError = (message: string, error?: Error | any, data?: any) => 
  logger.error(message, error, data);

