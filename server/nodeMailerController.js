const nodemailer = require('nodemailer'),
      {EMAIL, PASSWORD} = process.env;

module.exports = {
    email: async(req, res) => {
        const db = req.app.get('db')
        const {email} = req.body;
        const foundUser = await db.check_user({email})
        if(!foundUser[0]){
            return res.status(400).send('Email is not found')
        }
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                service: 'gmail',
                secure: false,
                requireTLS: true,
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            });

            let info = await transporter.sendMail({
                from: `Jesus Reyes <${EMAIL}>`,
                to: email,
                subject: 'Password Reset Test',
                text: 'This is a NodeMailer Test',
                html: `<div>This is NodeMailer Test</div>
                        <img src="cid:uniquenq@nodemailer.com"/>`,
                attachments: [
                    {
                        filename: 'license.txt',
                        path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
                    },
                    {
                        cid: 'uniquenq@nodemailer.com',
                        path: 'https://i.kym-cdn.com/photos/images/original/001/516/899/f31.jpg'
                    }
                ]
            })
            console.log("Message sent: %s", info.messageId);
            res.sendStatus(200)
    } 
}