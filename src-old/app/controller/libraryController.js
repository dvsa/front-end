/*jslint browser: true, evil: true, plusplus: true, white: true, indent: 4, nomen: true */
/*global require, __dirname, process, console */
'use strict';
var appConfig = require(__dirname + '/../../config/app-config').AppConfig;

(function(globals) {

    var libraryController = function libraryController(req, res, styleguide) {
        this.req = req;
        this.res = res;
        this.styleguide = styleguide;
    };

    // import abstracted generic functions
    var generic = require('./genericFunctions');

    // show session data
    // console.log(this.req.session);
    
    libraryController.prototype.libraryIndex = function libraryIndex() {

        this.view = 'mot/library/libraryIndex';
        this.data = 'library/libraryIndex';
        var viewData = this.styleguide.getData(this.data, {'loggedOut' : true, 'blackBarTitle' : 'Library'});


        // Render the template
        this.res.render(this.view, viewData);
    };

    libraryController.prototype.libraryIndexPost = function libraryIndexPost() {
        
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


    // Go baby!
    globals.libraryController = libraryController;

}(this));
