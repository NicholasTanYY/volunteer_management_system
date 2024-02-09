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
    const {fullName, phoneNumber, username, password, confirmPassword, isAdmin} = req.body;
    const usersWithUsername = await AppDataSource.getRepository(User).findOneBy({username: username});
    if (usersWithUsername != null) {
        res.json({message: "Username already exists!"});
        return;
    }
    const user = await AppDataSource.getRepository(User).create({fullName, phoneNumber, username, password, isAdmin});
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

app.post('/user/updateProfile', async (req, res) => {
    const {username, fullName, gender, dateOfBirth, email, phoneNumber, availability, occupation, school, interests, skills} = req.body;
    const usersWithUsername = await AppDataSource.manager.findOneBy(User, {username: username});
    if (usersWithUsername == null) {
        // This should never happen
        res.json({message: "Account not found :<"});
        return;
    }
    fullName !== '' ? usersWithUsername.fullName = fullName : null;
    gender !== '' ? usersWithUsername.gender = gender : null;
    dateOfBirth !== '' ? usersWithUsername.dateOfBirth = dateOfBirth : null;
    email !== '' ? usersWithUsername.email = email : null;
    phoneNumber !== '' ? usersWithUsername.phoneNumber = phoneNumber : null;
    availability !== '' ? usersWithUsername.availability = availability : null;
    occupation !== '' ? usersWithUsername.occupation = occupation : null;
    school !== '' ? usersWithUsername.school = school : null;
    interests.length !== 0 ? usersWithUsername.interests = interests : usersWithUsername.interests = null;
    skills.length !== 0 ? usersWithUsername.skills = skills : usersWithUsername.skills = null;
    await AppDataSource.manager.save(usersWithUsername);
    res.json({message: "User profile updated :>"});
});

app.post('/user/data', async (req, res) => {
    const {username} = req.body;
    const usersWithUsername = await AppDataSource.manager.findOneBy(User, {username: username});
    if (usersWithUsername == null) {
        // This should never happen
        res.json({message: "Account not found :<"});
        return;
    }
    res.json(usersWithUsername);
});


// Admin related functions
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
    const {fullName, phoneNumber, username, password, isAdmin} = req.body;
    const usersWithUsername = await AppDataSource.getRepository(User).findOneBy({username: username});
    if (usersWithUsername != null) {
        res.json({message: "Username already exists!"});
        return;
    }
    const user = await AppDataSource.getRepository(User).create({fullName, phoneNumber, username, password, isAdmin});
    const results = await AppDataSource.getRepository(User).save(user);
    res.json({message: "Admin added!"});
})

app.get('/viewDB', async (req, res) => {
    const results = await AppDataSource.getRepository(User).find()
    res.json(results);
})