const express = require('express');
const {resetPasswordUser} = require('@database/schemas/user');

const router = express.Router();

// Обработка POST запроса
router.get('/reset/:resetToken', async (req, res) => {
  try {
    const { resetToken } = req.params;

    // Находим пользователя по токену подтверждения регистрации
    const user = await resetPasswordUser(resetToken)
    if (!user) {
      return res.status(404).json({ message: '' });
    }

    //Создание токена для входа
    const token = createToken(user._id);

    // Сохранение токена в cookies
    res.cookie('_herid', token, { httpOnly: true, secure: true});

    return res.status(200).redirect("/password/reset");
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при подтверждении пользователя' });
    throw new Error("An error occurred while confirming the user. Error: " + error.message);
  }
});

module.exports = router;