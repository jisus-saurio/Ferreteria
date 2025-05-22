import express from 'express';
import logoutController from '../controllers/logoutController.js';

const routes = express.Router();

routes.route("/").post(logoutController.logout);

export default routes;