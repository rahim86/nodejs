var fs=require('fs'); // file process
var xml2js = require('xml2js'); // xml parser
var dirpath = require('path'); // get file format
var restService = require('./restService');


/**
 * This function reads xml files from current directory and converts xml to json format
 */
var readFiles = function() {

    // current directory
    var dir='./';
    fs.readdir(dir,function(err,files) {

        // error handling
        if (err) {
            console.log("Damn it. Error in your code Abdul");
            throw err;
        }

        files.forEach(function (file) {

            // check file extension for xml
            if(dirpath.extname(file) == '.xml') {

                // read file content
                console.log(file);
                fs.readFile(dir + file, 'utf-8', function (err, jsonData) {
                    if (err) {
                        console.log("Damn it. Error in your code Abdul");
                        throw err;
                    }

                    // parse file content to json
                    var xmlParser = new xml2js.Parser();
                    xmlParser.parseString(jsonData, function (err, result) {
                        console.log("Its JSON format now!", result);
                        restService.performRequest('/maps/api/geocode/json','GET','address=75+Village+Rd,+Woonsocket,+RI',function(){});
                    });
                });
            }
        });
    });
    //setInterval(readFiles,5000);
}

readFiles();