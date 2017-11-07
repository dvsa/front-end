/*jslint browser: true, evil: true, plusplus: true, white: true, indent: 4, nomen: true */
'use strict'; 

(function(globals) {

    var validator = function validator(params) {
        this.params = {};
    };

    validator.prototype.isTextRequired = function isTextRequired(params){
        if (params.inputValue === '' || !params.inputValue) {
            //var indefiniteArticle = String('aeiou').search(params.inputLabel.charAt(0).toLowerCase()) > 0 ? 'an' : 'a';
            return 'you must enter ' + this.getIAString(params.inputLabel) + ' ' + params.inputLabel;
        }
        return null;
    };

    validator.prototype.islessThan24Chars = function islessThan24Chars(params){
        // phone
        if (params.inputValue.length > 24) {
            return 'must be 24 characters or less';
        }
        return null;
    };

    validator.prototype.islessThan60Chars = function islessThan60Chars(params){
        // org name/ org trading name
        if (params.inputValue.length > 60) {
            return 'must be 60 characters or less';
        }
        return null;
    };

    validator.prototype.islessThan100Chars = function islessThan100Chars(params){
        // site name
        if (params.inputValue.length > 100) {
            return 'must be 100 characters or less';
        }
        return null;
    };

    validator.prototype.islessThan255Chars = function islessThan255Chars(params){
        // email
        if (params.inputValue.length > 255) {
            return 'must be 255 characters or less';
        }
        return null;
    };

    validator.prototype.isOptionRequired = function isTextRequired(params){
        if (params.inputValue === '' || !params.inputValue) {
            return 'you must choose ' + this.getIAString(params.inputLabel) + ' ' + params.inputLabel;
        }
        return null;
    };


    validator.prototype.getIAString = function getIAString(inputLabel){
        // returns indefinite article (a or an)
        return String('aeiou').search(inputLabel.charAt(0).toLowerCase()) > 0 ? 'an' : 'a';
    };


    globals.validator = validator;

}(this));
