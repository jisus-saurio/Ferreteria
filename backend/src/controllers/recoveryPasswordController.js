import JsonWebToken from "jsonwebtoken";

import bcrypt from "bcryptjs";

import clientsModel from "../models/customers.js";
import employeesModel from "../models/employee.js";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailRecoveryPassword.js";
import { config } from "../config.js";
import { verify } from "crypto";


//array de funciones
const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
const { email } = req.body;

try {
    
    let userFound;
    let userType;

    // Verificar si el usuario exista

    userFound = await clientsModel.findOne({ email });
    if(userFound){
        userType = "client";
    }else{
        userFound = await employeesModel.findOne({ email });
        if(userFound){
            userType = "employee";
        }
    }

    if (!userFound) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }



    // Generar el código de recuperación

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    const token = JsonWebToken.sign({ email, code, userType, verified: false }, config.JWT.SECRET, {
        expiresIn: "10m",
    });
//guardar token en cookie

res.cookie("recoveryToken", token, {maxAge: 10 * 60 * 1000});

// Enviar el correo electrónico con el código de recuperación

await sendEmail(
   email,
   "Password Recovery code",
   `Your recovery code is: ${code}`,
   HTMLRecoveryEmail(code)
);

res.json({
    message: "Recovery code sent"
});

} catch (error) {
    console.error(error);
    res.json({ message: "Error al enviar el código de recuperación" });
    
}
}

recoveryPasswordController.verifyCode = async (req, res) => {
const { code } = req.body;
try {
    
    const token = req.cookies.recoveryToken;

    const decoded = JsonWebToken.verify(token, config.JWT.SECRET);

    if(decoded.code !== code){
        return res.json({ message: "Código incorrecto" });
    }

    const newToken = JsonWebToken.sign({ email: decoded.email,code: decoded.code, userType: decoded.userType, verified: true },

    config.JWT.SECRET,
    {
        expiresIn: "10m",
    }

    );  
    
    res.cookie("recoveryToken", newToken, {maxAge: 10 * 60 * 1000});
    res.json({ message: "Código verificado" });
} catch (error) {
    console.log("error"+ error);
}

};

recoveryPasswordController.newPassword = async (req, res) => {
const { newPassword } = req.body;

try {

    // extraer el token de la cookie
    const token = req.cookies.recoveryToken;
    // extraer la informacion del token
    const decoded = JsonWebToken.verify(token, config.JWT.SECRET);
    // verificar si el token es valido
    if (!decoded.verified) {
        return res.json({ message: "Token no verificado" });
    }

    //extraer el email y el tipo de usuario del token
    const { email, userType } = decoded;

    //encriptar la contraseña

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    let updatedUser;

    //Actualizar la contraseña del usuario

    if (userType === "client") {
        updatedUser = await clientsModel.findOneAndUpdate(  { email }, { password: hashedPassword }, { new: true } );
    }else if (userType === "employee") {
        updatedUser = await employeesModel.findOneAndUpdate( { email }, { password: hashedPassword }, { new: true } );
    }

    //eliminar el token de la cookie
    res.clearCookie("recoveryToken");

    res.json({ message: "Contraseña actualizada" });


    
} catch (error) {
    
    console.log("error" + error);
}

}

export default recoveryPasswordController;