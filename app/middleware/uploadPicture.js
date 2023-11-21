/* eslint-disable max-len */
const path = require('path');
const fs = require('fs');

// eslint-disable-next-line consistent-return
const uploadPicture = async (req, res, pseudo) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier sélectionné' });
  }

  // On obtient le fichier téléchargé via req.file
  const { file } = req;
  const filePath = file.path;

  // Générez un nom de fichier unique
  const uniqueFileName = `${pseudo}-${Date.now()}-${file.originalname}`;

  // Construisez le chemin d'accès complet pour le fichier de destination permanent
  const destinationPath = path.join(__dirname, '../../../public/profilPictures', uniqueFileName);
  try {
    // Déplacez le fichier vers le dossier de destination permanent de manière synchrone
    fs.renameSync(filePath, destinationPath);

    //  Obtenez l'URL du fichier
    const fileUrl = `/public/profilPictures/${uniqueFileName}`;

    return fileUrl;
  } catch (error) {
    console.error('Error while moving the uploaded file:', error);
  }
};

module.exports = uploadPicture;
