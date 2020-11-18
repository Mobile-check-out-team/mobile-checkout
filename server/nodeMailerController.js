const nodemailer = require('nodemailer')
const {EMAIL, PASSWORD} = process.env;

module.exports = {
    email: async(req, res) => {
        const db = req.app.get('db')
        const {email} = req.body;
        const foundUser = await db.users.check_user({email})
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
                text: 'Test',
                html: 
                    `
                        <style>
                            .center {
                                width: 200px;
                                display: block; 
                                margin: 0 auto;
                            }
                            .reset-button {
                                background-color: #515ccf; 
                                font-size: 16px;
                                border: none;
                                color: white;
                                padding: 15px 32px;
                                text-align: center;
                                display: block; 
                                margin: 15px auto;
                            }
                        </style>
                        <img src="cid:uniquenq@nodemailer.com" alt="scan&go" class="center"/>
                        <h2>Hello ${foundUser[0].first_name},</h2>
                        <p>A request has been received to change the password for your scan&go account</p>
                        <button class="reset-button">RESET PASSWORD</button>
                        <p>If you did not initiate this request, please contact us immediately at <a href = "mailto: scan&go.dev@gmail.com">scan&go.dev@gmail.com.</a></p>
                        <h2 style="text-align:center;">This is only a test!</h2>
                        
                    `,
                attachments: [
                    {
                        filename: 'license.txt',
                        path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
                    },
                    {
                        cid: 'uniquenq@nodemailer.com',
                        path: 'https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/updatedLogo+USE+ME.svg'
                    }
                ]
            })
            console.log("Message sent: %s", info.messageId);
            res.sendStatus(200)
    } 
}