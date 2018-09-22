const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


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
  let transporter = nodemailer.createTransporter(smtpTransport(smtpConfig));
  return transporter;
}



// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req, res) => {
  res.json({name: "Test"});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
