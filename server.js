'use strict';

var express = require('express');
var app = module.exports = express();

app.use(express.static(__dirname));

app.listen(5000);
console.log('app is listening on port 5000');
