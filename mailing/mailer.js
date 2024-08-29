const nodemailer = require('nodemailer');
const privateKey = process.env.DKIM_PRIVATE_KEY.replace(/\\n/g, '\n');

const transporter = nodemailer.createTransport({
    host: 'smtp.ionos.es',
    port: 587,
    secure: false, 
    auth: {
        user: 'hola@masterquestion.es', 
        pass: process.env.PASSWORD_MAIL, 
    },
    dkim: {
        domainName: 'masterquestion.es',
        keySelector: 'mail',
        privateKey: privateKey,
    },
});

const sendWelcomeEmail = async (to, message) => {
    const mailOptions = {
        from: '"MasterQuestion" <hola@masterquestion.es>',
        to: to,
        subject: '¡Bienvenido a MasterQuestion!',
        text: message,
        html: `<p>${message}</p>`,
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