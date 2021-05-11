import express from 'express';

const routes = express.Router();

routes.use('/customer', routes )

export default routes;