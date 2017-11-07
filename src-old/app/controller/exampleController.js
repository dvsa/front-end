/*jslint browser: true, evil: true, plusplus: true, white: true, indent: 4, nomen: true */
/*global require, __dirname, process, console */
'use strict';
var appConfig = require(__dirname + '/../../config/app-config').AppConfig;

(function(globals) {

    var exampleController = function exampleController(req, res, styleguide) {
        this.req = req;
        this.res = res;
        this.styleguide = styleguide;
    };

    // import abstracted generic functions
    var generic = require('./genericFunctions');

    // show session data
    // console.log(this.req.session);
    
    exampleController.prototype.exampleIndex = function exampleIndex() {

        this.view = 'mot/example/example-index';
        this.data = 'example/example-index';
        var viewData = this.styleguide.getData(this.data, {'loggedOut' : true});

        var exampleVar = this.req.session.exampleVar;
        var error = this.req.session.error;

        viewData.exampleVar = exampleVar;
        viewData.error = error;

        if (error === true) {
            this.req.session.error = false;
            this.req.session.exampleVar = null;
        }
       
        // Render the template
        this.res.render(this.view, viewData);
    };

    exampleController.prototype.exampleIndexPost = function exampleIndexPost() {
        
        // Do stuff then redirect

        var exampleVar = this.req.param('input1');
        this.req.session.exampleVar = exampleVar;

        if (exampleVar.length > 2) {
            this.res.redirect('/example/example-second');
        } else {

            this.req.session.error = true;
            this.res.redirect('/example');
        }

        
    };

    exampleController.prototype.exampleSecond = function exampleSecond() {

        this.view = 'mot/example/example-second';
        this.data = 'example/example-second';
        var viewData = this.styleguide.getData(this.data, {'loggedOut' : true});

        var exampleVar = this.req.session.exampleVar;
        viewData.exampleVar = exampleVar;

        this.req.session.exampleVar = null;


        // Render the template
        this.res.render(this.view, viewData);
    };

    // Go baby!
    globals.exampleController = exampleController;

}(this));
