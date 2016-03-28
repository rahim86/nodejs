var os = require('os');
var http = require('http');
var util = require('util');

module.exports = {

	performServiceCall: function(fields, serviceName, req, fn) {

		if(serviceName=="getCaregiverCaregiveeDetails") {

				host = '';
				port = '';
				path = '';
				method= 'POST';
		}

		var data = JSON.stringify({
			fields
		});

		var options = {
			host: host,
			port: port,
			path: path,
			method: method,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Content-Length': data.length
			}
		};
		
		var msg = '';
		req = http.request(options, function(res) {
			

			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				msg += chunk;
			});

			console.log("********************************Header**********************************");
			console.log(os.EOL);
			// Print Response Header
			for (var item in res.headers) {
				console.log(item + ": " + res.headers[item]);		
			}
			console.log("********************************Header**********************************");
			console.log(os.EOL);
			// Print Response Body
			res.on('end', function() {
				//console.log("Service Response: %j",JSON.parse(msg));
				console.log(util.inspect(JSON.parse(msg), {depth: null, colors: true}));
				fn(msg);
			});
			
		});

		req.on('error',  function(e) {
				//console.log("Service Response: %j",JSON.parse(msg));
				console.log("Error in Request", + e.message);
		});

		
		//fn("1");
		//req.write(data);
		//req.end();
	}
}