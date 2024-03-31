const express = require('express');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
app.use(bodyParser.json());

// E-mail transport configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ishwarphone@gmail.com',
        pass: 'vmqe ylmm nbfp dziv' // Replace with the app password
    }
});

// Endpoint to send email
app.post('/send-email', (req, res) => {
    const { to, subject, text, time, date } = req.body;
    console.log(req.body);

    const mailOptions = {
        from: 'ishwarphone@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    // Format time and date into a cron expression
    const cronExpression = moment(`${date} ${time}`).format('m H D M d'); // Minutes Hours DayOfMonth Month DayOfWeek

    // Schedule the email sending using cron
    cron.schedule(cronExpression, () => {
        // Send e-mail
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                res.send('Email sent successfully');
            }
        });
    });

    res.send('Email scheduled successfully');
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
