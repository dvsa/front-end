import { check } from 'express-validator/check';

export const emailValidationChecks = [
  check('email')
    .exists()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email address must be a valid email address')
    .custom((value, { req }) => value === req.body.emailConfirmation)
    .withMessage('Does not match the confirmation email address'),
  check('emailConfirmation')
    .exists()
    .custom((value, { req }) => value === req.body.email)
    .withMessage('Confirmation does not match original email address'),
];
