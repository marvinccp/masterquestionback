const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ionos.es',
    port: 587,
    secure: false, 
    auth: {
        user: 'hola@masterquestion.es', 
        pass: process.env.PASSWORD_MAIL, 
    },
});

const sendWelcomeEmail = async (to) => {
    const mailOptions = {
        from: '"Nombre de tu Juego" <tu_correo@tu_dominio.com>',
        to: to,
        subject: '¡Bienvenido a MasterQuestion!',
        text: '¡Gracias por unirte a nuestro juego!',
        html: `<p>${message}</p>`, // Mensaje en HTML
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        return ({ succes: true, message: 'Error al enviar el correo'})        
    }
};

module.exports = {
    sendWelcomeEmail,
};