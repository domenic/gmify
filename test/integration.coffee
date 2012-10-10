"use strict"

should = require("chai").should()
path = require("path")
fs = require("fs")
gmify = require("..")

image = (relPath) => path.resolve(__dirname, "images", relPath)

after =>
    fs.unlinkSync(image("1-out.png"))
    fs.unlinkSync(image("2-out.png"))

specify "Format conversion", (done) =>
    gmify(image("1-in.svg"), image("1-out.png"), (err) =>
        should.not.exist(err)

        desired = fs.readFileSync(image("1-desired.png"))
        output = fs.readFileSync(image("1-out.png"))

        output.toString().should.equal(desired.toString())

        done()
    )


specify "Resizing", (done) =>
    operations = (file) => file.resize(200, 200)
    gmify(image("2-in.png"), image("2-out.png"), operations, (err) =>
        should.not.exist(err)

        desired = fs.readFileSync(image("2-desired.png"))
        output = fs.readFileSync(image("2-out.png"))

        output.toString().should.equal(desired.toString())

        done()
    )
