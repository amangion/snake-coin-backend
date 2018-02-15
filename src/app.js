import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import index from './routes/index';
import transactions from './routes/transactions';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const swaggerDocument = swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: 'Snake coin api',
      version: '1.0.0',
    },
  },
  apis: ['./src/controllers/*.js'],
});

const options = {
  explorer: true,
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use('/', index);
app.use('/api/transactions', transactions);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  const response = { error: err.message };
  if (req.app.get('env') === 'development') {
    response.details = err;
  }
  // render the error page
  res.status(err.status || 500);
  res.json(response);
});

export default app;
