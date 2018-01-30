import { check } from 'express-validator/check';

export const passwordValidationChecks = [
  check('password')
    .exists()
    .trim()
    .not()
    .isEmail()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be atleast 8 characters')
    .custom((value, { req }) => value === req.body.passwordConfirmation)
    .withMessage('Password does not match confirmation'),
  check('passwordConfirmation')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Password confirmation cannot be empty')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Confirmation does not match original password'),
];
