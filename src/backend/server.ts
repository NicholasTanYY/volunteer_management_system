import "reflect-metadata";
import { DataSource } from 'typeorm'
import  express, { Express } from 'express';
import * as dotenv from 'dotenv';
import { User } from './user.entity';
dotenv.config({ path: '../../.env' })
import cors from 'cors';

const app: Express = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors())
app.listen(PORT, ()=> console.log(`Server listening to port ${PORT}`));

const AppDataSource = new DataSource({
    "type": "postgres",
    "url": process.env.SERVER_URL,
    "entities": [User],
    "ssl": true
})
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization", err)
    })

app.post('/user/register', (req, res) => {
    const data = {
      message: 'Hello from the server!'
    };
    res.json(data);
  });