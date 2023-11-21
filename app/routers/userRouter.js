const express = require('express');
const userController = require('../controllers/userController');
const controllerHandler = require('../helpers/controllerHandler');
const { userUpdate } = require('../validations/userSchema');
const validate = require('../validations/validate');
const { authorize } = require('../auth');

const upload = require('../middleware/multer');

const router = express.Router();

router.get('/', controllerHandler(userController.getAllUsers));
router.get('/:id', controllerHandler(userController.getOneUser));
router.get('/user/:id', controllerHandler(userController.getOneUserX));

router.put('/:id', upload.single('picture'), validate(userUpdate, 'body'), authorize('modify', 'user'), controllerHandler(userController.editOneUser));

router.delete('/:id', authorize('delete', 'user'), controllerHandler(userController.deleteOneUser));

router.post('/checkPassword', controllerHandler(userController.checkPassword));
router.post('/checkEmail', controllerHandler(userController.checkEmail));
router.post('/checkPseudo', controllerHandler(userController.checkPseudo));

module.exports = router;

// Doc Swagger
/**
* @swagger
* tags:
*   name: Users
*   description: API routes for the Users
*/

/**
* @swagger
* components:
*   schemas:
*     Users:
*       type: object
*       properties:
*         id:
*           type: integer
*           description: The auto-generated id of the user
*         firstname:
*           type: string
*           description: The user firstname
*         lastname:
*           type: string
*           description: The user lastname
*         email:
*           type: string
*           description: The user email
*         pseudo:
*           type: string
*           description: The user pseudo
*         password:
*           type: string
*           description: The user password
*         description:
*           type: string
*           description: The user description
*         picture:
*           type: string
*           description: The user profile picture
*         availability:
*           type: boolean
*           description: The user availability
*         tags:
*           type: array
*           items:
*             type: object
*             properties:
*               id:
*                 type: integer
*               name:
*                 type: string
*         projects:
*           type: array
*           items:
*             type: object
*             properties:
*               id:
*                 type: integer
*               user_id:
*                 type: integer
*               title:
*                 type: string
*               description: 
*                 type: string
*               availability:
*                 type: boolean
*               user_pseudo:
*                 type: string
*               participants:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     user_id:
*                       type: integer
*                     firstname:
*                       type: string
*                     lastname:
*                       type: string
*                     pseudo:
*                       type: string
*                     availability:
*                       type: boolean
*               tags:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     tag_id:
*                       type: integer
*                     name:
*                       type: string
*         created_at:
*           type: string
*           format: date-time
*           description: The auto-generated time of the user's creation
*         updated_at:
*           type: string
*           format: date-time
*           description: The auto-generated time of the user's update
*       example:
*         id: 1
*         lastname: Captain
*         firstname: Haddock
*         email: captain@gmail.com
*         pseudo: Moussaillon
*         password: harengs1234
*         description: Vieux loup de mer
*         picture: https://cdn001.tintin.com/public/tintin/img/characters/le-capitaine-haddock/le-capitaine-haddock.png
*         availability: true
*         tags: [{id: 1, name: Java}]
*         projects: [{id: 1, title: DevsConnect}, {"user_id": 1, "firstname": "Aldonce", "lastname": "Lucas", "pseudo": "Charles_Dupont33", "is_active": false}, {"tag_id": 1, "name": "Java"}]
*         created_at: "2023-06-06T19:08:42.845Z"
*         updated_at: "2023-06-07T08:08:42.845Z"
*/

/**
* @swagger
* components:
*   schemas:
*     Users PUT:
*       type: object
*       required:
*         - id
*       properties:
*         lastname:
*           type: string
*           description: The user lastname
*         firstname:
*           type: string
*           description: The user firstname
*         email:
*           type: string
*           description: The user email
*         pseudo:
*           type: string
*           description: The user pseudo
*         password:
*           type: string
*           description: The user password
*         description:
*           type: string
*           description: The user pseudo
*         picture:
*           type: string
*           description: The user profile picture
*         availability:
*           type: boolean
*           description: The user availability
*         tags:
*           type: array
*           items:
*             type: integer
*           description: Array with all tags id of the user
*       example:
*         lastname: Captain
*         firstname: Haddock
*         email: captain@gmail.com
*         pseudo: Moussaillon
*         password: harengs1234
*         description: Vieux loup de mer
*         picture: https://cdn001.tintin.com/public/tintin/img/characters/le-capitaine-haddock/le-capitaine-haddock.png
*         availability: true
*         tags: [ 1, 2 ]
*/

/**
* @swagger
* components:
*   schemas:
*     Users POST:
*       type: object
*       required:
*         - lastname
*         - firstname
*         - email
*         - pseudo
*         - password
*         - description
*       properties:
*         lastname:
*           type: string
*           description: The user lastname
*         firstname:
*           type: string
*           description: The user firstname
*         email:
*           type: string
*           description: The user email
*         pseudo:
*           type: string
*           description: The user pseudo
*         password:
*           type: string
*           description: The user password
*         description:
*           type: string
*           description: The user pseudo
*         picture:
*           type: string
*           description: The user profile picture
*         availability:
*           type: boolean
*           description: The user availability
*         tags:
*           type: array
*           items:
*             type: integer
*           description: Array with all tags id of the project
*       example:
*         lastname: Captain
*         firstname: Haddock
*         email: captain@gmail.com
*         pseudo: Moussaillon
*         password: harengs1234
*         description: Vieux loup de mer
*         picture: https://cdn001.tintin.com/public/tintin/img/characters/le-capitaine-haddock/le-capitaine-haddock.png
*         availability: true
*         tags: [ 1, 2 ]
*/

/**
* @swagger
* components:
*   schemas:
*     Users login:
*       type: object
*       required:
*         - email
*         - password
*       properties:
*         email:
*           type: string
*           description: The user email
*         password:
*           type: string
*           description: The user password
*       example:
*         email: captain@gmail.com
*         password: harengs1234
*/

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the list of all the Users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *     summary: Get one project
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 *       204:
 *         description: The User was not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/signin:
 *  post:
 *    summary: Register a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users POST'
 *    responses:
 *      200:
 *        description: The user has been successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users POST'
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 * /api/login:
 *  post:
 *    summary: Connexion of a user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users login'
 *    responses:
 *      200:
 *        description: Successful connection
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users login'
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Update the user - permission needed
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users PUT'
 *    responses:
 *      200:
 *        description: The user has been updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users PUT'
 *      204:
 *        description: The user was not found
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *     summary: Delete the User by its id - permission needed
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user has been deleted
 *       204:
 *         description: The user was not found
 *       500:
 *        description: Vous ne pouvez pas supprimer votre profil avant de supprimer vos projets
 */
