import { body, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { createError } from './errorHandler';

// Validation rules for proposal generation
export const validateProposalRequest: ValidationChain[] = [
  body('clientName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Client name must be between 2 and 100 characters')
    .escape(),
  
  body('clientEmail')
    .isEmail()
    .withMessage('Valid email address is required')
    .normalizeEmail(),
  
  body('projectTitle')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Project title must be between 5 and 200 characters')
    .escape(),
  
  body('serviceDescription')
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Service description must be between 20 and 2000 characters'),
  
  body('deliverables')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Deliverables must be between 10 and 2000 characters'),
  
  body('costItems')
    .isArray({ min: 1, max: 20 })
    .withMessage('Cost items must be an array with 1-20 items'),
  
  body('costItems.*.description')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Cost item description must be between 3 and 200 characters'),
  
  body('costItems.*.hours')
    .isFloat({ min: 0.5, max: 10000 })
    .withMessage('Hours must be a number between 0.5 and 10000'),
  
  body('timelineItems')
    .isArray({ min: 1, max: 20 })
    .withMessage('Timeline items must be an array with 1-20 items'),
  
  body('timelineItems.*.milestone')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Milestone description must be between 3 and 200 characters'),
  
  body('timelineItems.*.startDate')
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  
  body('timelineItems.*.duration')
    .isInt({ min: 1, max: 365 })
    .withMessage('Duration must be between 1 and 365'),
  
  body('timelineItems.*.durationUnit')
    .isIn(['days', 'weeks', 'months'])
    .withMessage('Duration unit must be days, weeks, or months'),
  
  body('language')
    .optional()
    .isIn(['English', 'Spanish'])
    .withMessage('Language must be English or Spanish'),
  
  body('customTerms')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Custom terms cannot exceed 5000 characters'),
  
  body('anthropicApiKey')
    .optional()
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('API key must be between 10 and 200 characters')
    .matches(/^sk-/)
    .withMessage('API key must start with sk-')
];

// Middleware to handle validation results
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(error => ({
      field: error.type === 'field' ? (error as any).path : 'unknown',
      message: error.msg,
      value: error.type === 'field' ? (error as any).value : undefined
    }));

    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        status: 400,
        details: formattedErrors
      },
      timestamp: new Date().toISOString(),
      path: req.originalUrl
    });
  }
  
  next();
};

// Rate limiting validation (basic implementation)
export const validateRateLimit = (req: Request, res: Response, next: NextFunction) => {
  // In production, use Redis or similar for distributed rate limiting
  // For now, this is a placeholder
  const userKey = req.ip;
  
  // This would be implemented with proper rate limiting logic
  // For demo purposes, we'll just pass through
  next();
};