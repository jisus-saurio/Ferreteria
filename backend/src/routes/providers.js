import expres from 'express';
import providersController from '../controllers/providersController.js';
import multer from 'multer';

const router = expres.Router();

//configurar carpeta local para guardar imagenes

const upload = multer({dest: "public/"});

router.route('/')
    .get(providersController.getAllProviders)
    .post(upload.single("image"), providersController.insertProvider);

router.route('/:id')
    .put(upload.single("image"), providersController.updateProvider)


export default router;