const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

// app.use(express.json());

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'canvasassignmenttimer@gmail.com',
//     pass: 'JackJadaDylanEthan!!'
//   }
// });

var templateParams = {
  email: email,
  name: name,
};

emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams).then(
  (response) => {
    console.log('SUCCESS!', response.status, response.text);
  },
  (error) => {
    console.log('FAILED...', error);
  },
);

// app.post('/send-email', (req, res) => {
//   const { email } = req.body;

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'Assignment Not Submitted on Time',
//     text: 'Hi,\n\nYour friend ${name} did not submit their assignment on time. Maybe give them a little nudge!\n\nBest,\nCanvas Assignment Timer'
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).send('Error sending email');
//     }
//     res.status(200).send('Email sent: ' + info.response);
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
