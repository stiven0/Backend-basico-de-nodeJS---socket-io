
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');

  // middlewares
  app.use(bodyParser.urlencoded({ extended : true }));
  app.use(bodyParser.json());

  // CORS
  app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Authorization, token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
      next();
  });


  module.exports = app;
