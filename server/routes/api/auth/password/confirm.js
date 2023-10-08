const express = require('express');
const {sendRecoverMail} = require('@utils/email');
const {findUserByEmail} = require('@database/schemas/user');
const {verefyToken} = require('@utils/token')

const router = express.Router();

// Обработка POST запроса
router.post('/confirm', async (req, res) => {
  try {
    const { password } = req.body;
    if(!password) {
      return res.status(400).json({ message: 'Недостаточно параметров' });
    }
    const token = req.cookies._herid;
    if(!token) {
      return res.status(401).json({ message: 'Неавторизован' });
    }
    // Проверка уникальности почты
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      res.status(404).json({ message: 'Пользователя с такой почтой не существует' });
    }

    // Отправка письма с ссылкой для подтверждения регистрации
    await sendRecoverMail(existingUser)
    
    res.status(201).json({message: 'Письмо для подтверждения личности отправлено'});
    } catch (error) {
      res.status(500).json({ message: 'Произошла ошибка при востановлении пароля' });
      throw new Error("An error occurred while user regestration. Error: " + error.message);
    }
});

module.exports = router;