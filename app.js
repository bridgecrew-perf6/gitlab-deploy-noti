import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import router from './router';
import config from './config';

const app = express()

app.use(bodyParser.json());
app.use(compression());
app.use(cors());

app.use(router);

const port = config.app.port;
app.listen(port, () => {
  console.log(`app running...`);
  console.log(`env=${config.app.env}`);
  console.log(`port=${port}`);
})