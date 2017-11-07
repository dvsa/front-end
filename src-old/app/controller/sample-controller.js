/*jslint browser: true, evil: false, plusplus: true, white: true, indent: 4, nomen: true */
/*global require, __dirname, process, console */

(function(globals) {

    var SampleController = function SampleController(req, res, styleguide) {
        this.req = req;
        this.res = res;
        this.styleguide = styleguide;
    };

    SampleController.prototype.sampleAction = function sampleAction() {
        this.view = 'mot/development/app-controller.html';
        this.data = 'development/sample-controller';

        var viewData = this.styleguide.getData(this.data);

        // Example of using session data.
        //var username = (typeof this.req.session.username !== "undefined") ? this.req.session.username : '';

        // Example of changing view data in the controller.
        //viewData.viewData.assigningRoleMsg = {
        //    'msg' : "You are assigning a role to '" + username + "'."
        //};

        //viewData.viewData.contentNavigation[0].primary[0].isFormElement = true;
        //viewData.viewData['CONTEXT-FORM-ACTION'] = {};
        //viewData.viewData['CONTEXT-FORM-ACTION'].action = '/prototypes/manage-roles/summary';
        //viewData.viewData['CONTEXT-FORM-ACTION'].method = 'POST';

        this.res.render(this.view, viewData);
    };

    // This action is not used at the moment but just an example.
    SampleController.prototype.handleSampleAction = function handleSampleAction() {
        // Validate post.
        var isValid = ((typeof this.req.param('role') !== 'undefined') && this.req.param('role') !== '');

        // Set session data as only prototype.
        this.req.session.validation = {
            valid: isValid,
            msg: "We could not find the role <strong>" + this.req.param('role') + "</strong>"
        };
        this.req.session.flashMessages = [
            {
                level: "success",
                content: "A role notification has been sent to <strong>" + username + "</strong>"
            }
        ];

        // Redirect
        if(true === isValid) {
            this.req.session.role = this.req.param('role');
            this.res.redirect('/development/app-controller');
        } else {
            this.res.redirect('/development/app-controller');
        }
    };

    globals.SampleController = SampleController;

}(this));

