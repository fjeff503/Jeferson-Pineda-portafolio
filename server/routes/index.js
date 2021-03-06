const express = require('express');
const app = express();

//home
app.get('/', (req, res) => {
    res.render('../server/views/home', {
        nombre: 'Jefferson Pineda',
        annio: new Date().getFullYear()
    });
});

//recibir el email
app.post('/email', async (req, res) => {
    //traemos los datos del front end
    const { nameContact, emailContact, messageContact } = req.body;

    //creamos el cuerpo del mensaje 
    contentHTML = `
    <h1>Informacion del usuario</h1>
    <ul>
        <li>Nombre: ${nameContact}</li>
        <li>Correo: ${emailContact}</li>
    </ul>
    <p>Mensaje: ${messageContact}</p>`

    //enviamos el mensaje (tome el codigo de la pagina de nodejs-nodemailer-outlook)
    const nodeoutlook = require('nodejs-nodemailer-outlook')
    await nodeoutlook.sendEmail({
        auth: {
            user: process.env.EMAIL,
            pass: process.env.SEMIPASS
        },
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'Correo del curriculum online!',
        html: contentHTML,
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    });

    res.redirect('/');
});

module.exports = app;