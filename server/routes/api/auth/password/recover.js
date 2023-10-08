const express = require('express');
const {sendRecoverMail} = require('@utils/email');
const {findUserByEmail} = require('@database/schemas/user');

const router = express.Router();

// Обработка POST запроса
router.post('/recover', async (req, res) => {
  try {
    const { email } = req.body;
    if(!email) {
      res.status(400).json({ message: 'Недостаточно параметров' });
    }
    
    // Проверка почты
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      res.status(404).json({ message: 'Пользователя с такой почтой не существует' });
    }

    // Отправка письма с ссылкой для подтверждения сброса пароля
    await sendRecoverMail(existingUser)
    
    res.status(201).json({message: 'Письмо для подтверждения личности отправлено'});
    } catch (error) {
      res.status(500).json({ message: 'Произошла ошибка при востановлении пароля' });
      throw new Error("An error occurred while user regestration. Error: " + error.message);
    }
});

module.exports = router;