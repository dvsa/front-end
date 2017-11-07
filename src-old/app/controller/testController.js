/*jslint browser: true, evil: true, plusplus: true, white: true, indent: 4, nomen: true */
/*global require, __dirname, process, console */
'use strict';
var appConfig = require(__dirname + '/../../config/app-config').AppConfig;

(function(globals) {

    var testController = function testController(req, res, styleguide) {
        this.req = req;
        this.res = res;
        this.styleguide = styleguide;
    };

    // import abstracted generic functions
    var generic = require('./genericFunctions');

    // show session data
    // console.log(this.req.session);
    
    testController.prototype.testIndex = function testIndex() {

        this.view = 'mot/test';
        this.data = 'test';
        var viewData = this.styleguide.getData(this.data, {'loggedOut' : true});

        // Render the template
        this.res.render(this.view, viewData);
    };

    // this is for dumping code into to test when the specific/relevant pipeline is too awkward
    // I'm looking at you, MOTR...
    testController.prototype.codeDumpIndex = function codeDumpIndex() {

        this.view = 'mot/code_template';
        this.data = 'test';
        var viewData = this.styleguide.getData(this.data, {'loggedOut' : true});

        // Render the template
        this.res.render(this.view, viewData);
    };


    
    // Go baby!
    globals.testController = testController;

}(this));
