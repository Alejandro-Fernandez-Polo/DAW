const express = require('express');
const Redis = require('ioredis');

const app = express();
const redis = new Redis(process.env.REDIS_URL);

app.get('/', (req, res) => {
  redis.set('key', 'value');
  redis.get('key', function (err, result) {
    if (err) {
      res.send('Error al conectar a Redis');
    } else {
      res.send('Valor en Redis: ' + result);
    }
  });
});

app.listen(8080, () => {
  console.log('Aplicación escuchando en el puerto 8080');
});