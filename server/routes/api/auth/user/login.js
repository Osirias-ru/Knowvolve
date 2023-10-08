const express = require('express');
const bcrypt = require('bcryptjs');
const {findUserByEmail} = require('@database/schemas/user');
const {createToken} = require('@utils/token');

const router = express.Router();

// Обработка POST запроса
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ message: 'Недостаточно параметров' });
    }
    
    // Проверка существования пользователя с такой почтой
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ message: 'Пользователь с этим email не найдет' });
    }
    
    // Проверка правильности пароля
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }
    
    // Создание токена для аутентификации
    const token = createToken(existingUser._id);

    // Сохранение токена в cookies
    res.cookie('_herid', token, { httpOnly: true, secure: true });
    
    return res.status(200).redirect("/home");
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при входе пользователя' });
    throw new Error("An error occurred while user login. Error: " + error.message);
  }
});

module.exports = router;