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
                text: 'Password Reset Test',
                html: 
                    `
<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Password Reset Email</title>
    <style>
    @media only screen and (max-width: 620px) {
      table[class=body] h1 {
        font-size: 28px !important;
        margin-bottom: 10px !important;
      }
      table[class=body] p,
            table[class=body] ul,
            table[class=body] ol,
            table[class=body] td,
            table[class=body] span,
            table[class=body] a {
        font-size: 16px !important;
      }
      table[class=body] .wrapper,
            table[class=body] .article {
        padding: 10px !important;
      }
      table[class=body] .content {
        padding: 0 !important;
      }
      table[class=body] .container {
        padding: 0 !important;
        width: 100% !important;
      }
      table[class=body] .main {
        border-left-width: 0 !important;
        border-radius: 0 !important;
        border-right-width: 0 !important;
      }
      table[class=body] .btn table {
        width: 100% !important;
      }
      table[class=body] .btn a {
        width: 100% !important;
      }
      table[class=body] .img-responsive {
        height: auto !important;
        max-width: 100% !important;
        width: auto !important;
      }
    }

    @media all {
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
        line-height: 100%;
      }
      .apple-link a {
        color: inherit !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important;
      }
      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
      }
      .btn-primary table td:hover {
        background-color: #34495e !important;
      }
      .btn-primary a:hover {
        background-color: #34495e !important;
        border-color: #34495e !important;
      }
    }
    </style>
  </head>
  <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Scan&Go Password Reset</span>
    <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #5680e9;">
      <tr>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
          <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
          <img src="cid:uniquenq@nodemailer.com" alt="scan&go" style="width:250px; display:block; margin: 50px auto;"/>

            <!-- START CENTERED WHITE CONTAINER -->
            <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                    <tr>
                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hello ${foundUser[0].first_name},</p>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">A request has been received to change the password for your Scan&Go account.</p>                              
                        <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                          <tbody>
                            <tr>
                              <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                  <tbody>
                                    <tr>
                                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #5680e9; border-radius: 5px; text-align: center;"> <a href="${__dirname} + '/passwordReset" target="_blank" style="display: inline-block; color: #ffffff; background-color: #5680e9; border: solid 1px #5680e9; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; /*font-weight: bold;*/ margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Reset Password</a> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">If you did not initiate this request, please contact us immediately at <a href = "mailto: scan&go.dev@gmail.com">scan&go.dev@gmail.com.</a></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <!-- START FOOTER -->
            <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                <tr>
                  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #ffffff; text-align: center;">
                    <span class="apple-link" style="color: #ffffff; font-size: 12px; text-align: center;">This application was created by the following Devmountain students during bootcamp.</span>
                    <br><a href="https://www.linkedin.com/in/jesusreyes01/" style="text-decoration: underline; color: #ffffff; font-size: 12px; text-align: center;">Jesus Reyes</a>
                        <a href="https://www.linkedin.com/in/dominikrodriguez/" style="text-decoration: underline; color: #ffffff; font-size: 12px; text-align: center;">Dominik Rodriguez</a>
                        <a href="https://www.linkedin.com/in/brandenchong/" style="text-decoration: underline; color: #ffffff; font-size: 12px; text-align: center;">Brandon Chong</a>
                        <a href="https://www.linkedin.com/in/elliemcqueen/" style="text-decoration: underline; color: #ffffff; font-size: 12px; text-align: center;">Ellie McQueen</a>
                  </td>
                </tr>
                <tr>
                  <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #ffffff; text-align: center;">
                    Powered by <a href="http://htmlemail.io" style="color: #ffffff; font-size: 12px; text-align: center; text-decoration: none;">HTMLemail</a>.
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->


          <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
      </tr>
    </table>
  </body>
</html>                     
                    `,
                attachments: [
                    {
                        cid: 'uniquenq@nodemailer.com',
                        path: 'https://personal-project1.s3.amazonaws.com/66bf8346-783e-4840-9de4-5759b7a0c76f-Scan-&-Go.png'
                    }
                ]
            })
            console.log("Message sent: %s", info.messageId);
            res.sendStatus(200)
    } 
}

