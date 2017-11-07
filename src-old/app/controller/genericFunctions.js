
// validate password format
var validatePassword  = function(password) {
    var regex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,50})$/;
    return regex.test(password);
};

module.exports.validatePassword = validatePassword;

// is it a number?
var isNumeric = function (n) {
    // Passeth I an arguement and I shall telleth thee true if thine input ist numeric
    return !isNaN(parseFloat(n)) && isFinite(n);
};

module.exports.isNumeric = isNumeric;

// is this a valid email address
var validateEmail = function(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};

module.exports.validateEmail = validateEmail;

// is this a postcode
var validatePostcode = function (postcode) {
    postcode = postcode.replace(/\s/g, '');
    var regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
    return regex.test(postcode);
};

module.exports.validatePostcode = validatePostcode;

// turn strings into blobs to obfuscate (this is very ugly)
var obfuscationBlobs = function(stringToBlob) {
    var blobbedString = '';
    for(var i = 1; i < stringToBlob.length; i ++) {
        blobbedString += '&bull;';
    }
    return blobbedString;
};

module.exports.obfuscationBlobs = obfuscationBlobs;
