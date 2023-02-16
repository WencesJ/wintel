import express from 'express';
import logger from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';

// user custom modules
import { AppError, errorController as globalErrorHandler } from '@libs/error';
import HELPERS from '@libs/shared/helpers';

//routers
import routers from '@api/index.routes';

const xss = require('xss-clean');
//helpers

const {corsOptions } = HELPERS;

const corsSetup = cors(corsOptions);

const app = express();

//trust proxy

app.set('trust proxy', 1);

// GLOBAL MIDDLEWARES

// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
} else {
    app.use(logger('tiny'));
}

// IMPLEMENTING CORS FOR ALL ROUTES
app.options('*', corsSetup);

// BODY-PARSER, READING DATA = body INTO req.body
app.use(express.json({ limit: '10kb' }));

// GRABBING URL QUERIES
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// SET SECURITY HEADERS
app.use(helmet());

// PREVENT PARAMETER POLLUTION
app.use(
    hpp({
        whitelist: [],
    })
);

// DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());

// DATA SANITIZATION AGAINST XSS
app.use(xss());

// COMPRESSING TEXT RESPONSES
// app.use(compression()); // USED DURING PRODUCTION PHASE

app.use(cors(corsOptions));



// FEATURE ROUTERS
app.use('/api/v1', routers);

app.all('*', (req, res, next) => {
    return next(
        new AppError(
            `Wrong url '${req.originalUrl}'. This url doesn't exist!`,
            404
        )
    );
});

app.use(globalErrorHandler);

export default app;
