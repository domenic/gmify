"use strict";

var fs = require("fs");
var path = require("path");
var gm = require("gm");

module.exports = function gmify(sourceFileName, destFileName, operations, cb) {
    if (typeof cb === "undefined") {
        // No operations is legitimate; it means just format conversion.
        cb = operations;
        operations = function (x) { return x; };
    }

    var sourceStream = fs.createReadStream(sourceFileName);
    var destFormat = path.extname(destFileName).substring(1);


    var file = gm(sourceStream, sourceFileName);
    operations(file);

    file.stream(destFormat, function (err, stdout, stderr) {
        if (err) {
            cb(err);
            return;
        }

        var destStream = fs.createWriteStream(destFileName);
        stdout.pipe(destStream);

        destStream.on("close", function () {
            cb(null);
        });

        var errorText = "";
        stderr.on("data", function (chunk) {
            errorText += chunk;
        });
        stderr.on("end", function () {
            if (errorText) {
                cb(new Error(errorText));
            }
        });
    });
};
