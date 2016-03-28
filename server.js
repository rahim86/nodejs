var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var service = require('./service');

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(req, res);
    }

});

function displayForm(res) {
		fs.readFile('createProfile.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        /*res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields,
            files: files
        }));*/
		service.performServiceCall(fields, "getCaregiverCaregiveeDetails", req, function(res){
			//console.log(util.inspect(JSON.parse(msg), {depth: null, colors: true}));
			console.log("I already here");
			console.log(res);
		});
    });
}

server.listen(1185);
console.log("server listening on 1185");