'use strict';

const nodemailer  = require('nodemailer');
const functions   = require('firebase-functions');


class EmailSenderService {
  constructor () {}

  get EMAIL_SERVICE () {
    return 'gmail';
  }

  get SUBJECT () {
    return 'New AndyAndUX "Contact Us" request';
  }

  get FROM () {
    return `"AndyAndUX Mailer" <andyuxdev@gmail.com>`;
  }

  sendMail (text) {

    const mailTransport = nodemailer.createTransport({
      service: this.EMAIL_SERVICE,
      auth: {
        user: functions.config().gmail.email,
        pass: functions.config().gmail.password,
      },
    });

    const mailOptions = {
      from    : this.FROM,
      subject : this.SUBJECT,
      to      : functions.config().gmail.email,
      text    : text
    };

    return mailTransport.sendMail(mailOptions);
  }
}

module.exports = new EmailSenderService();
