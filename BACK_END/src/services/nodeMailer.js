    const nodemailer = require('nodemailer');
    const path = require('path');
    require('dotenv').config({ path: path.join(__dirname, '../..', '.env') });
    

    const sendEmail = async (config) => {
        try
        {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.USER_PASSWORD
                } 
            });



            let mailOptions = {
                from: config.from,
                to: config.to,
                subject: config.subject,
                text: config.text
            };



            let info = await transporter.sendMail(mailOptions);




            console.log('Email sent successfully');
            return info;

        } catch (err)
        {
            console.error(err);
            throw err;
        }

    };




module.exports = sendEmail;