import express from 'express';
import registerEmployeeController from '../controllers/registerEmployeeController.js';

const router = express.Router();

router.route("/").post(registerEmployeeController.registerEmployee);

export default router;