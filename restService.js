var https = require('https');

var host = 'maps.googleapis.com';

module.exports = {
    performRequest: function (endpoint, method, data, success) {
        var dataString = JSON.stringify(data);
        var headers = {};

        if (method == 'GET') {
            endpoint += '?' + data;
        }
        else {
            headers = {
                'Content-Type': 'application/json',
                'Content-Length': dataString.length
            };
        }
        var options = {
            host: host,
            path: endpoint,
            method: method,
            headers: headers
        };


        var req = https.request(options, function (res) {

            console.log(host+endpoint);
            res.setEncoding('utf-8');

            var responseString = '';

            res.on('data', function (data) {
                responseString += data;
            });

            res.on('end', function () {
                //console.log(responseString);
                var responseObject = JSON.parse(responseString);
                success(responseObject);
            });
        });

        req.write(dataString);
        req.end();
    }
}