const express = require('express');
const {createToken} = require('@utils/token');
const { confirmUser } = require('@database/schemas/user');

const router = express.Router();

// Роут для подтверждения регистрации
router.get('/verify/:verificationToken', async (req, res) => {
  try {
    const { verificationToken } = req.params;

    // Находим пользователя по токену подтверждения регистрации
    const user = await confirmUser(verificationToken)
    if (!user) {
      return res.status(400).json({ message: 'Похоже что вы уже подтверидили регестрацию' });
    }

    //Создание токена для входа
    const token = createToken(user._id);

    // Сохранение токена в cookies
    res.cookie('_herid', token, { httpOnly: true, secure: true});

    return res.status(200).redirect("/user/verify");
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при подтверждении пользователя' });
    throw new Error("An error occurred while confirming the user. Error: " + error.message);
  }
});

module.exports = router;
