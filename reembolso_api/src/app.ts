import express from 'express';

const app = express();

app.use(express.json()); //recuperar os dados com req e res

app.get('/', (req, res) => {
  res.send('Hello Wolrd!');
});

export { app };
