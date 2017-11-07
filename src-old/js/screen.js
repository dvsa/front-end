var fs = require('fs'),
    ReadDir = require('readdir');

(function(globals) {

    var Screen = function() {
        this.id = 0;
        this.name = "";
        this.route = "";
        this.callback = "res.send({ msg: \"Success!!\"})";
        this.path = '';
        this.routes = [];
    };

    Screen.prototype.setPath = function(path) {
        this.path = path;
    };

    Screen.prototype.getList = function getList(path) {
        var routesStr,
            re,
            m,
            routes = [],
            id = 0;

        ReadDir.readSync(path, ['**.js'], ReadDir.ABSOLUTE_PATHS)
            .forEach(function(filename) {
                routesStr = fs.readFileSync(filename, 'utf8');
                re = /app\.get\((['"])([\w\/\-.:]+)\1/g;
                 
                while ((m = re.exec(routesStr)) != null) {
                    if (m.index === re.lastIndex) {
                        re.lastIndex++;
                    }
                    routes.push({
                        "id" : id,
                        "route" : m[2],
                        "title" : m[2]
                    });
                    id++;
                }

            });

        this.routes = routes;

        return routes;
    };

    Screen.prototype.getScreen = function getScreen(id) {
        return this.getList(this.path)[id] || {};
    };

    Screen.prototype.writeSpiderFile = function writeSpiderFile(filename) {
        fs.writeFile(filename, this.createSpiderStr(), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("Spider file created");
        });
    };

    Screen.prototype.createSpiderStr = function createSpiderStr() {
        var str = '';
		for (var i = this.routes.length - 1; i >= 0; i--) {
            // Filter routes.
            //if (this.routes[i].route.match('example') !== null || this.routes[i].route.match('vm4842') !== null) {
                var name = this.routes[i].title.replace(/[-\/]/g, '__');
                str += '"' + name + '" => "' + this.routes[i].route + '",'
            //}
        };
        str = "{" + str + "}";
        return str;
    };

    globals.Screen = new Screen;
}(this));

