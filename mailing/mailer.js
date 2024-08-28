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

const sendWelcomeEmail = async (to, message) => {
    const mailOptions = {
        from: '"Nombre de tu Juego" <tu_correo@tu_dominio.com>',
        to: to,
        subject: '¡Bienvenido a MasterQuestion!',
        text: message,
        html: `<p>${message}</p>`, // Mensaje en HTML
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado');
        return { success: true, message: 'Correo enviado exitosamente' };
    } catch (error) {
        return ({ succes: false, message: 'Error al enviar el correo'})        
    }
};

module.exports = {
    sendWelcomeEmail,
};