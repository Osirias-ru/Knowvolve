const nodemailer = require('nodemailer');
const Handlebars = require("handlebars");
const fs = require('fs');

// Все шаблоны писем
const regestrationTemplate = fs.readFileSync('templates/registrationEmail.hbs').toString();
const recoverTemplate = fs.readFileSync('templates/recoverEmail.hbs').toString();

// Пользователь для отправки 
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendRegestrationMail = async (user) => {
  const template = Handlebars.compile(regestrationTemplate);
  const html = template({link: `${process.env.BASE_URL}:3001/api/user/verify/${user._id}`, name: user.name});
    
  await transporter.sendMail({
    from: process.env.NODEMAILER_USER,
    html: html,
    to: user.email,
    subject: 'Подтверждение регистрации',
  });
};

const sendRecoverMail = async (user) => {
  const template = Handlebars.compile(recoverTemplate);
  const html = template({link: `${process.env.BASE_URL}:3001/api/password/reset/${user.recoverToken}`, name: user.name});
    
  await transporter.sendMail({
    from: process.env.NODEMAILER_USER,
    html: html,
    to: user.email,
    subject: 'Сброс пароля',
  });
}

module.exports = { sendRegestrationMail, sendRecoverMail };

