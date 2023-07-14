import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import { ThreadsAPI } from 'threads-api';


const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World From the Typescript Server!')
});

app.get('/api/hello', (req: Request, res: Response) => {
    res.send('Hello World From the Typescript Server!')
});

app.get('/api/user/:username', async (req: Request, res: Response) => { // note the "async" keyword
    const username = req.params.username;
    const threadsAPI = new ThreadsAPI();
    const userID = await threadsAPI.getUserIDfromUsername(username); // note the "await" keyword
    if(!userID) {
        res.status(404).send('User not found');
    } else {
        const user = await threadsAPI.getUserProfile(userID); // again, use "await" if this is an async operation
        return user;
        // Don't forget to send a response back to the client here,
        // for instance: res.status(200).json(user);
    }
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});