const nodemailer = require("nodemailer")
const path=require('path')

const sendmail = async (options) => {

    try {
        const transporter = await nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,// Use `true` for port 465, `false` for all other ports
            auth: {
                user: 'haresh2932@gmail.com',
                pass: 'pgis ngpc enks tsrm'
            },
        });

        var mailOptions = {
            from: 'haresh2932@gmail.com',
            to: options,
            subject: 'Sending Email for Login ',
            text: 'Invoice with product detail',
            attachments: [
                {
                    filename: 'document.pdf',
                    path:path.join(__dirname,'../../public/assets/document.pdf')
                }
            ]
        };

        


        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        })

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        console.log(error);
    }


}


module.exports = sendmail
