import nodemailer from 'nodemailer';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import clientModel from '../models/customers.js';

import { config } from '../config.js';

const registerClientsController = {};

registerClientsController.registerClient = async (req, res) => {

    const { name, lastName, birthday, email, password, telephone, dui, isVerified } = req.body;

    try {

        const existClient = await clientModel.findOne({ email });
        if (existClient) {
            return res.json({ message: "El cliente ya existe" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newClient = new clientModel({ name, lastName, birthday, email, password: passwordHash, telephone, dui: dui || null, isVerified: isVerified || false });
        await newClient.save();

        const verificationToken = crypto.randomBytes(3).toString('hex');

        const tokenCode = jsonwebtoken.sign({ email ,verificationToken }, config.JWT.SECRET, { expiresIn: '2h' });

        res.cookie("verificationToken", tokenCode, {maxAge: 2*60*60*1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.emailUser.USER_EMAIL,
                pass: config.emailUser.USER_PASS
            }
        });

        const mailOptions = {
            from: config.emailUser.USER_EMAIL,
            to: email,
            subject: "Verificación de cuenta",
            html: 
            `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Correo Vintage</title>
    <style>
        body {
            font-family: "Courier New", Courier, monospace;
            background-color: #f4e1d2;
            color: #5a3e2b;
            padding: 20px;
        }
        .container {
            background-color: #fff8e7;
            border: 2px solid #b97a57;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
        }
        h1 {
            font-size: 24px;
            color: #8b4513;
            text-align: center;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
            text-align: justify;
        }
        .code {
            font-family: "Courier New", Courier, monospace;
            background-color: #e7c8a8;
            padding: 10px;
            border: 1px solid #8b4513;
            display: inline-block;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Mensaje</h1>
        <p>Estimado/a <span id="name"></span>,</p>
        <p>Gracias por tu tiempo. Tu código de verificación es:</p>
        <p class="code" id="verificationToken"> ${verificationToken}</p>
        <p class="footer">Este mensaje fue generado por chat.</p>
    </div>
</body>
</html>` 
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error al enviar el correo: " + error);
            } else {
                res.json({message: "Email de verificación enviado" + info.response});
            }
        });

        res.json({ message: "Cliente registrado exitosamente por favor verifique su correo" });


        
    } catch (error) {
        console.log("error" + error);
        res.json({ message: "Error al registrar el cliente" });
        
    }
}

registerClientsController.verifyCodeEmail = async (req, res) => {

    const { verificationCodeRequest } = req.body;

    const token = req.cookies.verificationToken;

    const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);

    const { email, verificationCode: storedCode } = decoded;

    if(verificationCodeRequest !== storedCode) {
        return res.json({ message: "Código de verificación incorrecto" });
    }
   
    const client = await clientModel.findOne({ email });
    client.isVerified = true;
    await client.save();
    res.clearCookie("verificationToken");

    res.json({ message: "Código de verificación correcto" });
}


export default registerClientsController;

