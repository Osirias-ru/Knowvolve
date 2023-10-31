const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const courseValidation = require('../../validations/course.validation');
const courseController = require('../../controllers/course.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createCourse'), validate(courseValidation.createCourse), courseController.createCourse)
  .get(validate(courseValidation.getCourses), courseController.getCourses);

router
  .route('/:courseId')
  .get(validate(courseValidation.getCourse), courseController.getCourse)
  .patch(auth('manageCourse'), validate(courseValidation.updateCourse), courseController.updateCourse)
  .delete(auth('manageCourse'), validate(courseValidation.deleteCourse), courseController.deleteCourse);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Курсы
 *   description: Управление курсами
 */

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Создать новый курс
 *     description: Создаёт новый курс в аккаунте пользователя
 *     tags: [Курсы]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: От 8 до 38 символов
 *               description:
 *                 type: string
 *                 description: От 200 до 500 символов
 *               subjects:
 *                  type: 
 *                    array:
 *                      items: 
 *                        type:
 *                          string,
 *                        enum: 
 *                          '#/components/schemas/User'
 *               visibility:
 *                 type: string,
 *                 enum: ["public", "private"]
 *               price:
 *                 type: number
 *             example:
 *               title: "Информатика. ОГЭ - это легко"
 *               description: "Курс создан для тех, кто сдаёт ОГЭ по информатике и хочет подготовится <...>"
 *               subjects: ["informatics", "programing"]
 *               visibility: public
 *               price: 1000
 *     responses:
 *       "201":
 *         description: Создано
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Course'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Список всех курсов
 *     description: Список всех курсов с возможностью поиска
 *     tags: [Курсы]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Название круса
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Максимальное количество курсов на странице
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Номер страницы
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 */

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Получить курс
 *     description: Получить курс по id
 *     tags: [Курсы]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID курса
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Course'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Обновить данные курса
 *     description: Обновляет информацию о курсе по id
 *     tags: [Курсы]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID курса
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: От 8 до 38 символов
 *               description:
 *                 type: string
 *                 description: От 200 до 500 символов
 *               subjects:
 *                  type: 
 *                    array:
 *                      items: 
 *                        type:
 *                          string,
 *                        enum: 
 *                          '#/components/schemas/User'
 *               visibility:
 *                 type: string,
 *                 enum: ["public", "private"]
 *               price:
 *                 type: number
 *             example:
 *               title: "Информатика. ОГЭ - это легко"
 *               description: "Курс создан для тех, кто сдаёт ОГЭ по информатике и хочет подготовится <...>"
 *               subjects: ["informatics", "programing"]
 *               visibility: public
 *               price: 1000
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Course'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Удалить курс
 *     description: Удаляет курс по id
 *     tags: [Курсы]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID курса
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
