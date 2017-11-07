/*jslint node: true, evil: false, plusplus: true, white: true, indent: 4, nomen: true */
/*global require, __dirname */

var fs = require('fs');

(function(globals) {

    function Styleguide (viewDir, assetPath) {
        this.viewDir = viewDir;
        this.assetPath = assetPath;
    }

    Styleguide.prototype.setOptions = function setOptions(options) {
        this.viewDir = options.viewDir || '';
        this.assetPath = options.assetPath || '';
    };

    Styleguide.prototype.getViewData = function(strFileName) {
        var file = this.viewDir + '/data/' + strFileName +'.json',
            jsFile = this.viewDir + '/data/' + strFileName +'.js',
            viewData;
    
        try {
            viewData = JSON.parse(fs.readFileSync(file, 'utf8'));
        } catch (e) {

            var fileExists = fs.existsSync(jsFile);

            if (fileExists) {
                viewData = require(jsFile);
            } else {
                viewData = {};
                console.log("The data for view " + strFileName + " does not exist!");
                console.log("The js data for view " + jsFile + " does not exist!");
            }
        }

        return viewData;
    };

    Styleguide.prototype.getData = function getData(viewName, options) {
        var options = options || {};
        var viewData = this.getViewData(viewName);
        
        var data =  {
            'assetPath' : this.assetPath, 
            'viewData' : viewData
            // ,
            // 'devTools' : this.getViewData('dev-tools')
        };

        for(var index in options) { 
            data[index] = options[index]; 
        }

        return data;
    };

    globals.Styleguide = new Styleguide;
}(this));
