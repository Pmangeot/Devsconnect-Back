const express = require('express');
const tagController = require('../controllers/tagController');
const controllerHandler = require('../helpers/controllerHandler');
const router = express.Router();

router.get('/', controllerHandler(tagController.getAllTags));
router.get('/:id', controllerHandler(tagController.getOneTag)); 

module.exports = router;

// Doc Swagger
/**
* @swagger
* components:
*   schemas:
*     Tags:
*       type: object
*       properties:
*         id:
*           type: integer
*           description: The auto-generated id of the tag
*         name:
*           type: string
*           description: The tag name
*         created_at: 
*           type: timestamp
*           description: The auto-generated time of the tag's creation
*         updated_at: 
*           type: timestamp
*           description: The auto-generated time of the tag's update
*       example:
*         id: 1
*         name: Java
*         created_at: "2023-06-06T19:08:42.845Z"
*         updated_at: "2023-06-07T08:08:42.845Z"
*/

/**
* @swagger
* tags:
*   name: Tags
*   description: API routes for the Tags
*/

/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: Returns the list of all the Tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: The list of the tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tags'
 */

/**
 * @swagger
 * /api/tags/{id}:
 *  get:
 *     summary: Get one tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tag id
 *     responses:
 *       200:
 *         description: The tag by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tags'
 *       204:
 *         description: The tag was not found
 */
