const path = require("path");
const express = require("express");
const bunyan = require("bunyan");
const morgan = require("morgan");
const cors = require("cors");
const body_parser = require("body-parser");
const method_override = require("method-override");
const mongoose = require("mongoose");

/**
 * Application environment
 */
const env = process.env.NODE_ENV || "development";
const conf = require(path.resolve(__dirname, "./config/application.json"))[env];

/**
 * Application logger
 */
const logLevel = process.env.LOG_LEVEL || "info";
const logger = bunyan.createLogger({ name: conf.appname, level: logLevel });

/**
 * Application configuration
 */
module.exports = async () => {
  const app = express();

  app.use(body_parser.json());
  app.use(method_override());

  app.use(morgan("combined"));

  // Log each request entering our API
  app.use((req, res, next) => {
    logger.debug({
      method: req.method,
      host: req.headers.host,
      url: req.url,
      useragent: req.headers["user-agent"]
    });
    next();
  });

  app.use(cors());
  app.use((req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
  });

  /**
   * Application API end point
   */
  app.set("logger", logger);
  app.set("configuration", conf);

  require("./utils/routes")(app);

  /**
   * Application error handler
   */
  app.use((req, res) => {
    res.status(400).send({
      status: 400,
      success: false,
      message: "Route invalid."
    });
  });

  return app;
};
