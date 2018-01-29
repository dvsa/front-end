import { check } from 'express-validator/check';

export const detailsValidationChecks = [
  check('firstname')
    .exists()
    .not()
    .isEmpty()
    .withMessage('First name cannot be empty'),
  check('lastname')
    .not()
    .isEmpty()
    .withMessage('Last name cannot be empty'),
  check('day')
    .not()
    .isEmpty()
    .withMessage('Day field cannot be empty'),
  check('month')
    .not()
    .isEmpty()
    .withMessage('Month field cannot be empty'),
  check('year')
    .not()
    .isEmpty()
    .withMessage('Year field cannot be empty'),
];
