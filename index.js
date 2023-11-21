// const http = require('http');
require('dotenv').config();
const debug = require('debug')('app:server');
const app = require('./app');

const port = process.env.PORT ?? 3000;

// si besoin d'un serveur HTTP natif (pour les websockets par exemple)
// const server = http.createServer(app);

// démarrer le serveur Express sur le port défini
app.listen(port, () => {
  debug(`API started on port ${port}`);
  debug(`API Docs here : http://localhost:${port}/api-docs/`);
  console.log(`API Docs here : http://localhost:${port}/api-docs/`);
});
