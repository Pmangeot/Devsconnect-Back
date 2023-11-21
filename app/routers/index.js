const express = require('express');

const { ApiError, errorHandler } = require('../helpers/errorHandler');
const controllerHandler = require('../helpers/controllerHandler');

const projectRouter = require('./projectRouter');
const userRouter = require('./userRouter');
const tagRouter = require('./tagRouter');

const upload = require('../middleware/multer');

// require JWT authController sur les routes login refresh authorize pour validite et regles d'acces
const userController = require('../controllers/userController');

const { userCreate } = require('../validations/userSchema');
const validate = require('../validations/validate');

const router = express.Router();

// User registration route
router.post('/signin', upload.single('picture'), validate(userCreate, 'body'), controllerHandler(userController.register));

// User login route
router.post('/login', controllerHandler(userController.login));

// Refresh token route
router.post('/refresh-token', controllerHandler(userController.tokenRefresh));

router.use('/api/projects', projectRouter);
router.use('/api/users', userRouter);
router.use('/api/tags', tagRouter);
//
router.use(() => {
  throw new ApiError('API Route not found', { statusCode: 404 });
});

router.use((err, _, res, next) => {
  errorHandler(err, res, next);
});

module.exports = router;
