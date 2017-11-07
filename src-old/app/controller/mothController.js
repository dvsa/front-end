/*jslint browser: true, evil: true, plusplus: true, white: true, indent: 4, nomen: true */
/*global require, __dirname, process, console */
'use strict';
var appConfig = require(__dirname + '/../../config/app-config').AppConfig;

(function(globals) {

    var mothController = function mothController(req, res, styleguide) {
        this.req = req;
        this.res = res;
        this.styleguide = styleguide;
    };

    // import abstracted generic functions
    var generic = require('./genericFunctions');

    // show session data
    // console.log(this.req.session);
    
    mothController.prototype.mothIndex = function mothIndex() {

        this.view = 'mot/moth/moth-index';
        this.data = 'moth/moth-index';
        var viewData = this.styleguide.getData(this.data, {'loggedOut' : true, 'blackBarTitle' : 'Check MOT history'});

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

    mothController.prototype.mothIndexPost = function mothIndexPost() {
        
        // Do stuff then redirect

        var exampleVar = this.req.param('input1');
        this.req.session.exampleVar = exampleVar;

        if (exampleVar.length > 2) {
            this.res.redirect('/moth/search-results');
        } else {

            this.req.session.error = true;
            this.res.redirect('/moth/enter-reg');
        }
    };

    // Enter reg
    mothController.prototype.mothEnterReg = function mothEnterReg() {

        this.view = 'mot/moth/moth-enter-reg';
        this.data = 'moth/moth-enter-reg';
        var viewData = this.styleguide.getData(this.data, {'loggedOut' : true, 'blackBarTitle' : 'Check MOT history'});

        var exampleVar = this.req.session.exampleVar;
        viewData.exampleVar = exampleVar;

        this.req.session.exampleVar = null;


        // Render the template
        this.res.render(this.view, viewData);
    };

     mothController.prototype.mothEnterRegPost = function mothEnterRegPost() {

        this.res.redirect('/moth/enter-reg');

    };

    // Enter reg: ERROR
    mothController.prototype.mothEnterRegError = function mothEnterRegError() {

        this.view = 'mot/moth/moth-enter-reg-error';
        this.data = 'moth/moth-enter-reg-error';
        var viewData = this.styleguide.getData(this.data, {'loggedOut' : true, 'blackBarTitle' : 'Check MOT history'});

        var exampleVar = this.req.session.exampleVar;
        viewData.exampleVar = exampleVar;

        this.req.session.exampleVar = null;


        // Render the template
        this.res.render(this.view, viewData);
    };

    mothController.prototype.mothEnterRegErrorPost = function mothEnterRegErrorPost() {

        this.res.redirect('/moth/enter-reg-error');

    };

    // Results page
    mothController.prototype.mothSearchResults = function mothSearchResults() {

        this.view = 'mot/moth/moth-search-results';
        this.data = 'moth/moth-search-results';
        var viewData = this.styleguide.getData(this.data, {'loggedOut' : true, 'blackBarTitle' : 'Check MOT history'});

        var exampleVar = this.req.session.exampleVar;
        viewData.exampleVar = exampleVar;

        this.req.session.exampleVar = null;


        // Render the template
        this.res.render(this.view, viewData);
    };

    // Results page
    mothController.prototype.mothPrivacyPolicy = function mothPrivacyPolicy() {

        this.view = 'mot/moth/moth-privacy-policy';
        this.data = 'moth/moth-privacy-policy';

        var viewData = this.styleguide.getData(this.data, {'loggedOut' : true, 'blackBarTitle' : 'Check MOT history'});

        // Render the template
        this.res.render(this.view, viewData);
    };

    // Go baby!
    globals.mothController = mothController;

}(this));
