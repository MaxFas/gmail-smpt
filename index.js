const express = require('express')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const cors = require('cors')


const port = process.env.PORT || 3010;
let smtp_login = process.env.SMTP_LOGIN || '___'
let smtp_pass = process.env.SMTP_PASS || '___'


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_pass, // generated ethereal password
    },
});

app.post('/sendMessage', async function (req, res) {

    let {contact, name, message} = req.body

    let info = await transporter.sendMail({
        from: 'HR WANTS ME',
        to: "maxfasc@gmail.com",
        subject: "HR WANTS ME",
        html: `<b>Сообщение с вашего портфолио:</b>
                    <div>
                        name: ${name}
                    </div>
                    <div>
                        contact: ${contact}
                    </div>
                    <div>
                        message ${message}
                    </div>`,
    });
    res.send('Your Message')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})