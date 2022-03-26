/**
 * @description: Set of routes for the app. Routing refers to determining how an application responds
 * to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request
 * method (GET, POST, and so on). For example, executing:
 * "app.METHOD(PATH, HANDLER)"
 * Where:
 * app - is an instance of express.
 * METHOD - is an HTTP request method, in lowercase.
 * PATH - is a path on the server.
 * HANDLER - is the function executed when the route is matched.
 * Basically, "routing"  refers to how an application’s endpoints (URIs) respond to client requests
 * @link https://expressjs.com/en/starter/basic-routing.html
 * @link https://expressjs.com/en/guide/routing.html
 * @exports function routerApi
 */

const express = require('express');
const userRouter = require('./user.router');
const deviceRouter = require('./device.router');
const groupRouter = require('./group.router');

function routerApi(app){
    /**
     * @param object app - The express instance created in index.js
     * @var const router - instance of express router.
     */
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/user',userRouter);
    router.use('/device',deviceRouter);
    router.use('/group',groupRouter);
}

module.exports = routerApi;
