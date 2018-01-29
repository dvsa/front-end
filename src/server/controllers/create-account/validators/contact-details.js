import { check } from 'express-validator/check';

export const contactDetailsValidationChecks = [
  check('address1')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Home address cannot be empty'),
  check('townOrCity')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Town or city cannot be empty'),
  check('postCode')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Post code cannot be empty'),
  check('phoneNumber')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Phone number cannot be empty'),
];
