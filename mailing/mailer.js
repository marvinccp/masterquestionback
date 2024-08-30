const nodemailer = require("nodemailer");
const privateKey = process.env.DKIM_PRIVATE_KEY.replace(/\\n/g, "\n");

const transporter = nodemailer.createTransport({
  host: "smtp.ionos.es",
  port: 587,
  secure: false,
  auth: {
    user: "hola@masterquestion.es",
    pass: process.env.PASSWORD_MAIL,
  },
  dkim: {
    domainName: "masterquestion.es",
    keySelector: "mail",
    privateKey: privateKey,
  },
});

const sendWelcomeEmail = async (to) => {
  const mailOptions = {
    from: '"MasterQuestion" <hola@masterquestion.es>',
    to: to,
    subject: "¡Bienvenido a MasterQuestion!",
    html: `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: auto;
                padding: 20px;
                box-sizing: border-box;
            }
            .header {
                text-align: center;
            }
            .header img {
                max-width: 100%;
                height: auto;
            }
            .footer {
                font-size: 0.8em;
                color: #666;
                text-align: center;
                margin-top: 20px;
            }
            .footer img {
                max-width: 50px; 
                height: auto;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Imagen Principal -->
            <div class="header">
                <img src="https://marvinberrio.es/_next/image?url=%2Fprojects_images%2Fmaster_question1.png&w=256&q=75" alt="Welcome Image">
            </div>
            
            <!-- Mensaje de Bienvenida -->
            <h1 style="text-align: center; color: #1a73e8;">¡Bienvenido a MasterQuestion!</h1>
            <p>Hola!! Gracias por apoyar el trabajo de nuevos desarrolladores.</p>
    
            <!-- Explicación del Juego -->
            <h2>¿Cómo Funciona el Juego?</h2>
            <p>MQ es el típico juego de trivia, donde escoges un nivel de dificultad y te son entregadas preguntas aleatorias que debes responder en máximo 10 segundos. Al final de cada partida recibirás una puntuación que te ayudará a estar en los primeros lugares del ranking.</p>
    
            <!-- Mensaje de Aclaración -->
            <p>MQ no usará tu correo electrónico para publicidad directa o de terceros.</p>
            <!-- Enlace al juego -->
            <p>Para empezar a jugar, visita <a href="https://www.masterquestion.es" style="color: #1a73e8; text-decoration: none;">MasterQuestion</a>.</p>
    
            <!-- Disclaimer -->
            <div class="footer">
                <p>&copy; 2024 MasterQuestion. Todos los derechos reservados.</p>
                <img src="https://yt3.googleusercontent.com/ytc/AIdro_m80a0aD5EXFaaysXg8ACEtVasblGT1FtjsqAt3tKxZnlk=s160-c-k-c0x00ffffff-no-rj" alt="TEV Studio Logo">
            </div>
        </div>
    </body>
    </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado");
    return { success: true, message: "Correo enviado exitosamente" };
  } catch (error) {
    return { succes: false, message: "Error al enviar el correo" };
  }
};

module.exports = {
  sendWelcomeEmail,
};
