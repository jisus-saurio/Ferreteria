import providersModel from '../models/providers.js';
import {v2 as cloudinary} from 'cloudinary';
import {config} from '../config.js';

//en el controlador se debe configurar cloudinary primero

cloudinary.config({
  cloud_name: config.cloudinary.CLOUD_NAME,
  api_key: config.cloudinary.API_KEY,
  api_secret: config.cloudinary.API_SECRET,
});

//Arrar de funciones para el CRUD
const providersController = {};

providersController.getAllProviders = async (req, res) => {

    const providers = await providersModel.find();
    res.json(providers);
}

//INSERT 

providersController.insertProvider = async (req, res) => {

    const {name, telephone} = req.body;

    let imageUrl = '';

    //Subir imagen a cloudinary
    if(req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'public',
            allowed_formats: ['jpg', 'png', 'jpeg'],
        })
        imageUrl = result.secure_url;
    }

    //Guardar en la base de datos
    const newProvider = new providersModel({
        name,
        telephone,
        image: imageUrl
    })
    newProvider.save()
    res.json({message: 'Proveedor agregado con exito'});
};

//UPDATE
providersController.updateProvider = async (req, res) => {
    const {name, telephone} = req.body;
    let imageUrl = '';

    //Subir imagen a cloudinary
    if(req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'public',
            allowed_formats: ['jpg', 'png', 'jpeg'],
        })
        imageUrl = result.secure_url;
    }
    //Actualizar en la base de datos
    await providersModel.findByIdAndUpdate(req.params.id, {
        name,
        telephone,
        image: imageUrl
    }, {new: true});
    res.json({message: 'Proveedor actualizado con exito'});
}

//DELETE
providersController.deleteProvider = async (req, res) => {
    await providersModel.findByIdAndDelete(req.params.id);
    res.json({message: 'Proveedor eliminado con exito'});
}


export default providersController;
