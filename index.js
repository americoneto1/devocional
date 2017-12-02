const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'app')));

require('./api')(app);

app.listen(port, () => console.log('Servidor iniciado na porta ' + port));