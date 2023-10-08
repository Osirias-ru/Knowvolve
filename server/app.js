require("dotenv").config();
require("module-alias/register");

const express = require('express');
const cors = require('cors');
const { initializeMongoose } = require("@database/mongoose");


const apiRoutes = require('@routes/api');

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());// для обработки тела запроса
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); // для обработки CORS-запросов

//Подключение всех роутов
app.use('/api', apiRoutes);

// Обработка 404 ошибки
app.use((req, res, next) => {
    res.status(404).json({message: "Страница не найдена"});
});

(async () => {
  await initializeMongoose();
})();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
