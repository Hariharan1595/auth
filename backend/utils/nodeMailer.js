import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host:'smtp-relay.brevo.com',
    port: 587,// Typically 587 for secure (STARTTLS)
    auth:{  
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
    
   
})
export default transporter