/* eslint-disable import/no-extraneous-dependencies */
const multer = require('multer');

// Configuration de multer
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
