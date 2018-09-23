const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const app = express();
// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));

// Getter for Nodemailer Transporter
let getTransporter = () => {
  const smtpConfig = {
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }    
}
  
  // Create the SMTP transporter with config
  let transporter = nodemailer.createTransport(smtpTransport(smtpConfig));
  return transporter;
};

app.post('/mail', (req, res) => {
  let message = req.body.message;
  let senderName = req.body.name;
  let senderEmail = req.body.email;
  const baseURL = process.env.ORIG_URL;
  
  sendEmail(senderName, senderEmail, message);
  res.redirect(baseURL); // Redirect to same page
});


const sendEmail = (name, email, message) => {
  let mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'zhabib@ufl.edu',
    subject: `New Message from ${name} on Portfolio`,
    text: `${message}`
  };
  
  // Send email via SMTP with defined options
  let transporter = getTransporter();
  transporter.sendMail(mailOptions, (err) => {
    if (err) return console.log(err);
    console.log('Email Sent!');
  });
  
}

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.send("Hi! This is a server endpoint for Formailer! For more info goto: s");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
