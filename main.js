#!/usr/bin/env node

/**
 * TEDxPurdueU/Kiosk
 * :: Simple node app for asking questions at event entrances
 *
 * kiosk.tedxpurdueu.com
 */

var express = require('express'),
    jsonServer = require('json-server');

var app = express();

app.use('/api', jsonServer.router('db.json'));
app.use('/', express.static('static'));

app.listen(2017, () => console.log('Kiosk started!'));
