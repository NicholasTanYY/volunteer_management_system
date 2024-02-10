import "reflect-metadata";
import { DataSource } from 'typeorm'
import  express, { Express } from 'express';
import * as dotenv from 'dotenv';
import { User } from './user.entity';
import { Event } from './event.entity';
import { Blog } from './blog.entity';
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
    "entities": [User, Event, Blog],
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

// User related functions
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

app.get('/user/getEvents', async (req, res) => {
    const events = await AppDataSource.getRepository(Event).find();
    res.json(events);
});

app.post('/user/getEvent', async (req, res) => {
    const {username} = req.body;
    const user = await AppDataSource.getRepository(User).findOneBy({username: username});
    const eventsSignedUpFor = user?.eventsSignedUpFor;
    res.json(eventsSignedUpFor);
});

app.post('/user/getEventDetails', async (req, res) => {
    const result: Event[] = []
    const {eventNames} = req.body;
    for (let i = 0; i < eventNames.length; i++) {
        const event = await AppDataSource.getRepository(Event).findOneBy({name: eventNames[i]});
        if (event == null) {
            return;
        }
        result.push(event);
    }
    res.json(result);
});

app.post('/user/signupEvent', async (req, res) => {
    const {username, eventName} = req.body;
    const user = await AppDataSource.getRepository(User).findOneBy({username: username});
    if (user == null) {
        // This should never happen
        res.json({message: "Account not found :<"});
        return;
    }
    const event = await AppDataSource.getRepository(Event).findOneBy({name: eventName});
    if (event == null) {
        // This should never happen
        res.json({message: "Event not found :<"});
        return;
    }
    if (user.eventsSignedUpFor == null) {
        user.eventsSignedUpFor = []
    } else if (user.eventsSignedUpFor.find(event => event == eventName) != null) {
        res.json({message: "Already signed up for this event"});
        return;
    }
    user.eventsSignedUpFor.push(event.name);
    if (event.usersSignedupFor == null) {
        event.usersSignedupFor = []
    }
    event.usersSignedupFor.push(user.username);
    await AppDataSource.manager.save(user);
    await AppDataSource.manager.save(event);
    res.json({message: "Successfully signed up for event :>"});
})

app.post('/user/createBlogPost', async (req, res) => {
    const { name, datePosted, timePosted, eventName, createdBy, description } = req.body;
    const blog = await AppDataSource.getRepository(Blog).create({ name, datePosted, timePosted, eventName, createdBy, description });
    const results = await AppDataSource.getRepository(Blog).save(blog);
    res.json({message: "Blog post created!"});
})

app.get('/user/getBlogs', async (req, res) => {
    const blogs = await AppDataSource.getRepository(Blog).find();
    res.json(blogs);
}

)

// Admin related functions

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

app.post('/admin/createEvent', async (req, res) => {
    const {name, date, startTime, endTime, category, description, createdBy} = req.body;
    const eventWithName = await AppDataSource.getRepository(Event).findOneBy({name: name});
    if (eventWithName != null) {
        res.json({message: "Event already exists!"});
    }
    const event = await AppDataSource.getRepository(Event).create({name, date, startTime, endTime, category, description, createdBy});
    const results = await AppDataSource.getRepository(Event).save(event);
    res.json({message: "Event added!"});
})

app.post('/admin/getEvents', async (req, res) => {
    const {createdBy} = req.body;
    const events = await AppDataSource.getRepository(Event).findBy({createdBy: createdBy});
    res.json(events);
})

// temporary utility functions
app.post('/user/clear', async (req, res) => {
    const results = await AppDataSource.getRepository(User).clear();
    res.json({message: "DB reset!"});
})

app.post('/event/clear', async (req, res) => {
    const results = await AppDataSource.getRepository(Event).clear();
    res.json({message: "DB reset!"});
})

app.post('/blog/clear', async (req, res) => {
    const results = await AppDataSource.getRepository(Blog).clear();
    res.json({message: "DB reset!"});
})

app.get('/viewDB', async (req, res) => {
    const results = await AppDataSource.getRepository(User).find();
    const results2 = await AppDataSource.getRepository(Event).find();
    const results3 = await AppDataSource.getRepository(Blog).find();
    res.json(results3);
})