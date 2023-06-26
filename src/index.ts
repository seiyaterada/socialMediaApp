import express, {Request, Response} from 'express';
import connectToDatabase from './db/connectToDatabase';
import redisClient from './db/connectToRedis';
import usersRouter from './routes/users';
import postsRouter from './routes/posts';
import commentsRouter from './routes/comments';
import notificationsRouter from './routes/notifications';
import activitiesRouter from './routes/activity';
import os from 'os';

const app = express();
const port = 3000;

(async () => {
    await connectToDatabase();
    await redisClient.connect();
})();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send(os.hostname());
});

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/notifications', notificationsRouter);
app.use('/activities', activitiesRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
