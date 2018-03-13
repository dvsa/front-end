import { check } from 'express-validator/check';

const weakPasswordMessage = 'Your password cannot contain; username, personal information or any blocked words';

export const passwordValidationChecks = [
  check('password')
    .exists()
    .trim()
    .not()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be atleast 8 characters')
    // Blocked word check
    .contains('password')
    .withMessage(weakPasswordMessage)
    // Blocked word check
    .contains('blocked_word')
    .withMessage(weakPasswordMessage)
    // Personal details check
    .custom((value, { req }) => value === req.body.email)
    .isEmail()
    .withMessage(weakPasswordMessage)
    .custom((value, { req }) => value === req.body.firstname)
    .withMessage(weakPasswordMessage)
    .custom((value, { req }) => value === req.body.middlename)
    .withMessage(weakPasswordMessage)
    .custom((value, { req }) => value === req.body.lastname)
    .withMessage(weakPasswordMessage)
    // Contains mixed characters
    .custom((value, { req }) => {
      !/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(value);
    })
    .withMessage('Password must contain both uppercase and lowercase characers')
    // Has numeric value
    .custom((value, { req }) => !/[0-9]/.test(value))
    .withMessage(weakPasswordMessage)
    // Check it matches confirmation
    .custom((value, { req }) => value === req.body.passwordConfirmation)
    .withMessage('Password does not match confirmation'),

  check('passwordConfirmation')
    .exists()
    .not()
    .withMessage('Password confirmation cannot be empty')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Confirmation does not match original password'),
];
