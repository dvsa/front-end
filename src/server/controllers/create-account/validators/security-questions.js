import { check } from 'express-validator/check';

export const securityQuestions = [
  check('questionOne')
    .exists()
    .not()
    .isEmpty()
    .not()
    .contains('select')
    .withMessage('Question one cannot be empty'),
  check('questionOneAnswer')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Question one answer cannot be empty'),
  check('questionTwo')
    .exists()
    .not()
    .isEmpty()
    .not()
    .contains('select')
    .withMessage('Question two cannot be empty')
    .custom((value, { req }) => value !== req.body.questionOne)
    .withMessage('Question two cannot be the same as question one'),
  check('questionTwoAnswer')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Question two answer cannot be empty'),
];
