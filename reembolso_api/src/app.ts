import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); // habilitando o cors
app.use(express.json()); //recuperar os dados com req e res

app.get('/', (req, res) => {
  res.send('Hello Wolrd!');
});

export { app };
