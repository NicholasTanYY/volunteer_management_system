import "reflect-metadata";
import { DataSource } from 'typeorm'
import  express, { Express } from 'express';
import * as dotenv from 'dotenv';
import { User } from './user.entity';
dotenv.config()
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
    "ssl": true,
    "synchronize": true
})
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization", err)
    })

app.post('/user/register', async (req, res) => {
    const {firstName, lastName, phoneNumber, username, password, confirmPassword, isAdmin} = req.body;
    const usersWithUsername = await AppDataSource.getRepository(User).findOneBy({username: username});
    if (usersWithUsername != null) {
        res.json({message: "Username already exists!"});
        return;
    }
    const user = await AppDataSource.getRepository(User).create({firstName, lastName, phoneNumber, username, password, isAdmin});
    const results = await AppDataSource.getRepository(User).save(user);
    res.json({message: "Registration successful!"});
  });

app.post('/user/login', async (req, res) => {
    const {username, password} = req.body;
    const usersWithUsername = await AppDataSource.getRepository(User).findOneBy({username: username});
    if (usersWithUsername == null) {
        res.json({message: "Account not found :<"});
        return;
    }
    if (usersWithUsername.password != password) {
        res.json({message: "Wrong username or password :<"});
        return;
    }
    res.json({message: "Login successful!"});
})

app.post('/user/clear', async (req, res) => {
    const results = await AppDataSource.getRepository(User).clear();
    res.json({message: "DB reset!"});
})

app.post('/admin/login', async (req, res) => {
    const {username, password} = req.body;
    const usersWithUsername = await AppDataSource.getRepository(User).findOneBy({username: username});
    if (usersWithUsername == null) {
        res.json({message: "Account not found :<"});
        return;
    }
    if (usersWithUsername.password != password) {
        res.json({message: "Wrong username or password :<"});
        return;
    }
    if (usersWithUsername.isAdmin == false) {
        res.json({message: "Not an admin account"});
        return;
    }
    res.json({message: "Login successful!"});
})

app.post('/admin/createAccount', async (req, res) => {
    const {firstName, lastName, phoneNumber, username, password, isAdmin} = req.body;
    const user = await AppDataSource.getRepository(User).create({firstName, lastName, phoneNumber, username, password, isAdmin});
    const results = await AppDataSource.getRepository(User).save(user);
    res.json({message: "Admin added!"});
})