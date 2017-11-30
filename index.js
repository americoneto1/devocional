const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'app')))

app.get('/api/v1/iluminalma/:dia/:mes', (req, res) =>
    res.send('Hello ' + req.params.dia + req.params.mes)
)

app.listen(port, () => console.log('Servidor iniciado na porta ' + port))