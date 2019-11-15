const nodemailer = require('nodemailer');

const sendPdf = async (pdfPath) => {
    
    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
        user: 'roux.morgan@gmail.com',
        pass: 'Ispicedicounas2019!'
        }
    });

    const message = {
        from: 'test@minibus.com',
        to: 'roux.morgan@gmail.com',
        subject: 'Voici votre relevé minibus',
        html: '<h1>Minibus</h1><p>Avec vous sur la route</p>',
        attachments: [
            { // Use a URL as an attachment
            filename: 'Releve.pdf',
            path: pdfPath
        }
        ]
    };

    await transport.sendMail(message, (err, info) => {
        if (err) {
        console.log(err)
        } else {
        console.log(info);
        }
    });
}

module.exports = sendPdf;