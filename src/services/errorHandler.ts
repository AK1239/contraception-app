/**
 * Centralized error handling service
 * Provides consistent error handling, user-friendly error messages,
 * and error reporting capabilities
 */

import { AppError } from '../types/app';
import { logger } from './logger';

export enum ErrorCode {
  // Eligibility Engine Errors
  ELIGIBILITY_CALCULATION_FAILED = 'ELIGIBILITY_CALCULATION_FAILED',
  ELIGIBILITY_INVALID_INPUT = 'ELIGIBILITY_INVALID_INPUT',
  ELIGIBILITY_MISSING_DATA = 'ELIGIBILITY_MISSING_DATA',
  
  // Personalization Engine Errors
  PERSONALIZATION_FAILED = 'PERSONALIZATION_FAILED',
  PERSONALIZATION_INVALID_FILTERS = 'PERSONALIZATION_INVALID_FILTERS',
  PERSONALIZATION_NO_METHODS = 'PERSONALIZATION_NO_METHODS',
  
  // Component Errors
  COMPONENT_RENDER_ERROR = 'COMPONENT_RENDER_ERROR',
  COMPONENT_MOUNT_ERROR = 'COMPONENT_MOUNT_ERROR',
  
  // Navigation Errors
  NAVIGATION_ERROR = 'NAVIGATION_ERROR',
  NAVIGATION_INVALID_ROUTE = 'NAVIGATION_INVALID_ROUTE',
  
  // Data Errors
  DATA_LOAD_ERROR = 'DATA_LOAD_ERROR',
  DATA_SAVE_ERROR = 'DATA_SAVE_ERROR',
  DATA_INVALID_FORMAT = 'DATA_INVALID_FORMAT',
  
  // Network Errors (for future use)
  NETWORK_ERROR = 'NETWORK_ERROR',
  NETWORK_TIMEOUT = 'NETWORK_TIMEOUT',
  
  // Generic Errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

/**
 * User-friendly error messages
 */
const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.ELIGIBILITY_CALCULATION_FAILED]: 
    'We encountered an issue calculating your eligibility. Please try again or contact support if the problem persists.',
  [ErrorCode.ELIGIBILITY_INVALID_INPUT]: 
    'Some of your answers are invalid. Please review your responses and try again.',
  [ErrorCode.ELIGIBILITY_MISSING_DATA]: 
    'Some required information is missing. Please complete all questions and try again.',
  
  [ErrorCode.PERSONALIZATION_FAILED]: 
    'We encountered an issue personalizing your recommendations. Please try again.',
  [ErrorCode.PERSONALIZATION_INVALID_FILTERS]: 
    'Your preferences could not be processed. Please review your selections and try again.',
  [ErrorCode.PERSONALIZATION_NO_METHODS]: 
    'No contraceptive methods match your current preferences and health profile. Please consult with a healthcare provider.',
  
  [ErrorCode.COMPONENT_RENDER_ERROR]: 
    'We encountered an issue displaying this screen. Please try again or restart the app.',
  [ErrorCode.COMPONENT_MOUNT_ERROR]: 
    'We encountered an issue loading this screen. Please try again.',
  
  [ErrorCode.NAVIGATION_ERROR]: 
    'Navigation error occurred. Please try again.',
  [ErrorCode.NAVIGATION_INVALID_ROUTE]: 
    'The requested page could not be found.',
  
  [ErrorCode.DATA_LOAD_ERROR]: 
    'Failed to load your data. Please try again.',
  [ErrorCode.DATA_SAVE_ERROR]: 
    'Failed to save your data. Please try again.',
  [ErrorCode.DATA_INVALID_FORMAT]: 
    'The data format is invalid. Please try again.',
  
  [ErrorCode.NETWORK_ERROR]: 
    'Network error occurred. Please check your connection and try again.',
  [ErrorCode.NETWORK_TIMEOUT]: 
    'Request timed out. Please check your connection and try again.',
  
  [ErrorCode.UNKNOWN_ERROR]: 
    'An unexpected error occurred. Please try again or contact support if the problem persists.',
  [ErrorCode.VALIDATION_ERROR]: 
    'Please check your input and try again.',
};

/**
 * Create an AppError from an error code and optional details
 */
export function createError(
  code: ErrorCode,
  details?: any,
  originalError?: Error
): AppError {
  const message = ERROR_MESSAGES[code] || ERROR_MESSAGES[ErrorCode.UNKNOWN_ERROR];
  
  return {
    code,
    message,
    details: details || (originalError ? { originalMessage: originalError.message } : undefined),
  };
}

/**
 * Handle an error and return a user-friendly AppError
 */
export function handleError(
  error: unknown,
  defaultCode: ErrorCode = ErrorCode.UNKNOWN_ERROR,
  context?: string
): AppError {
  // Log the error
  const errorMessage = context 
    ? `${context}: ${error instanceof Error ? error.message : String(error)}`
    : (error instanceof Error ? error.message : String(error));
  
  logger.error(errorMessage, error instanceof Error ? error : new Error(String(error)), {
    context,
    defaultCode,
  });

  // If it's already an AppError, return it
  if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
    return error as AppError;
  }

  // If it's a standard Error, extract information
  if (error instanceof Error) {
    // Try to determine error code from error message or type
    let errorCode = defaultCode;
    
    // Check for specific error patterns
    if (error.message.includes('eligibility') || error.message.includes('MEC')) {
      errorCode = ErrorCode.ELIGIBILITY_CALCULATION_FAILED;
    } else if (error.message.includes('personalization') || error.message.includes('filter')) {
      errorCode = ErrorCode.PERSONALIZATION_FAILED;
    } else if (error.message.includes('validation') || error.message.includes('invalid')) {
      errorCode = ErrorCode.VALIDATION_ERROR;
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      errorCode = ErrorCode.NETWORK_ERROR;
    }
    
    return createError(errorCode, { originalMessage: error.message, stack: error.stack }, error);
  }

  // For unknown error types
  return createError(defaultCode, { originalError: String(error) });
}

/**
 * Wrap an async function with error handling
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  errorCode: ErrorCode = ErrorCode.UNKNOWN_ERROR,
  context?: string
): T {
  return (async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      const appError = handleError(error, errorCode, context);
      throw appError;
    }
  }) as T;
}

/**
 * Wrap a synchronous function with error handling
 */
export function withSyncErrorHandling<T extends (...args: any[]) => any>(
  fn: T,
  errorCode: ErrorCode = ErrorCode.UNKNOWN_ERROR,
  context?: string
): T {
  return ((...args: any[]) => {
    try {
      return fn(...args);
    } catch (error) {
      const appError = handleError(error, errorCode, context);
      throw appError;
    }
  }) as T;
}

/**
 * Check if an error is of a specific type
 */
export function isErrorCode(error: unknown, code: ErrorCode): boolean {
  return (
    error !== null &&
    typeof error === 'object' &&
    'code' in error &&
    (error as AppError).code === code
  );
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
    const appError = error as AppError;
    // Check if the code exists in ERROR_MESSAGES
    if (appError.code in ERROR_MESSAGES) {
      return appError.message;
    }
    return ERROR_MESSAGES[ErrorCode.UNKNOWN_ERROR];
  }
  
  if (error instanceof Error) {
    // Return a generic message for unknown errors
    return ERROR_MESSAGES[ErrorCode.UNKNOWN_ERROR];
  }
  
  return ERROR_MESSAGES[ErrorCode.UNKNOWN_ERROR];
}

/**
 * Check if error is recoverable
 */
export function isRecoverableError(error: AppError): boolean {
  const recoverableCodes: ErrorCode[] = [
    ErrorCode.NETWORK_ERROR,
    ErrorCode.NETWORK_TIMEOUT,
    ErrorCode.DATA_LOAD_ERROR,
    ErrorCode.DATA_SAVE_ERROR,
  ];
  
  return recoverableCodes.includes(error.code as ErrorCode);
}

