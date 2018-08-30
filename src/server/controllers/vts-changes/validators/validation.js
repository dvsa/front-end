import { isEmpty } from '../helpers/helpers';

/** 
 * Validation middleware function used to populate errors on
 * equipment type
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} - Express Next object
 */
export const validateType = (req, res, next) => {

    // Get submitted values
    const formData = req.body;
    // Remove any that are null (eg submit button)
    delete formData['null'];
    
    // If no value is populated
    if ( isEmpty(formData) ) {
        // Pass on with errors in session
        req.session.viewData.errors.push({ typeError: 'Choose an equipment type' });
        return next();
    }
    // If no errors, remove any present and pass on 
    req.session.viewData.errors = [];
    next();
};