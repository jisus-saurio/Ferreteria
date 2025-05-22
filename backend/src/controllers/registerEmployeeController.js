import employeeModel from '../models/employee.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {config} from "../config.js";

const registerEmployeeController = {};

registerEmployeeController.registerEmployee = async (req, res) => {
const {name, lastName, birthday, email, address, password, hireDate, telephone, dui, isVerified, issnumber} = req.body;

try {
    //verificar si existe
    const employeeExist = await employeeModel.findOne({ email });
    if (employeeExist)
        { return res.json({ message: "El empleado ya existe" });
}

    //encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    //crear nuevo empleado
    const newEmployee = new employeeModel({ name, lastName, birthday, email, address, password: passwordHash, hireDate, telephone, dui, isVerified, issnumber });
    await newEmployee.save();

    //crear token
    jwt.sign(
        {
            id: newEmployee._id
        },
        config.JWT.SECRET,
        { expiresIn: config.JWT.EXPIRES },

        (error, token) => {
            if (error) console.log("error")

                res.cookie("authToken", token)
                res.json({ message: "Empleado registrado exitosamente"});
        }

    )

} 

catch (error) {
    console.log("error"+error)
    res.json({ message: "Error al registrar el empleado" });
    
}
};

export default registerEmployeeController;

