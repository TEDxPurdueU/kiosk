#!/usr/bin/env node

/**
 * TEDxPurdueU/Kiosk
 * :: Simple node app for asking questions at event entrances
 *
 * kiosk.tedxpurdueu.com
 */

var jsonServer = require("json-server"),
    app = jsonServer.create(),
    router = jsonServer.router("db.json"),
    middlewares = jsonServer.defaults();

app.use(middlewares);
app.use("/api", router);

app.listen(2017, () => console.log("Kiosk started!"));

