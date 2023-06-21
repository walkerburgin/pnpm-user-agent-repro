#!/usr/bin/env node

const express = require("express");
const proxy = require("express-http-proxy");

const app = express();

app.use((req, _res, next) => {
    console.log(req.path + " -> ", req.headers["user-agent"]);
    next();
});

app.use(proxy("https://registry.npmjs.org/"));

app.listen(8080);