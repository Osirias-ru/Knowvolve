const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const {sendRegestrationMail} = require('@utils/email');
const {registerUser, findUserByEmail} = require('@database/schemas/user');

const router = express.Router();

// Обработка POST запроса
router.post('/auth', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(!email || !password || !name) {
      res.status(400).json({ message: 'Недостаточно параметров' });
    }
    
    // Проверка уникальности почты
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: 'Пользователь с такой почтой уже существует' });
    }
    
    // Хеширование пароля
    const saltPassword = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltPassword);
    
    // Создание токена для подтверждения регистрации
    const verificationToken = crypto.randomUUID();

    // Создание токена изменения пароля 
    const saltRecover = await bcrypt.genSalt(12);
    const recoverToken = crypto.randomUUID();
    const hashedRecoverToken = await bcrypt.hash(recoverToken, saltRecover);
    
    // Регистрация пользователя в базе данных
    const user = await registerUser({
      name: name,
      email: email,
      password: hashedPassword,
      isVerefy: false,
      verificationToken: verificationToken,
      recoverToken: hashedRecoverToken
    });

    // Отправка письма с ссылкой для подтверждения регистрации
    await sendRegestrationMail(user)

    // Сохранение пользователя в базе данных
    await user.save();
    
    res.status(201).json({message: 'Письмо для подтверждения регестрации отправлено'});
    } catch (error) {
      res.status(500).json({ message: 'Произошла ошибка при регистрации пользователя' });
      throw new Error("An error occurred while user regestration. Error: " + error.message);
    }
});

module.exports = router;