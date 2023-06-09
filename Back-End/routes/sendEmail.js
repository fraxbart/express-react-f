import express from 'express'
import { createTransport } from 'nodemailer'

const router = express.Router()

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'astrid.fisher@ethereal.email',
        pass: 'Szzg4Uqta7Pfaab91G'
    }
});

router.post('/sendEmail', async (req, res) => {
    const { subject, message } = req.body

    const mailOptions = {
        from: 'admin@test.it',
        to: 'destinatario@test.it',
        subject,
        message
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error('Email non inviata')
            res.status(500).send('Email non inviata')
        }
        res.status(200).send('Email inviata correttamente')
    })
})

export default router