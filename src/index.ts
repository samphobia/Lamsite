import * as dotenv from 'dotenv';
import express from 'express';
import connectToMongoDB from './config/db';
import bookRoutes from './routes/book';
import authRoutes from './routes/auth';
import blogRoutes from './routes/blog';
import donationRoutes from './routes/donations';
import consultRoutes from './routes/consult';
import counsellRoutes from './routes/counselling';
import connectRoutes from './routes/connect';
import messageRoutes from './routes/messages';
import bookLRoutes from './routes/bookLaunch';
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import { CustomError } from './utils/customeError';
import cors from "cors";

const app = express();



dotenv.config();

app.use(express.json());
app.use(cors());


app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/donation', donationRoutes);
app.use('/api/consult', consultRoutes);
app.use('/api/counsell', counsellRoutes);
app.use('/api/connect', connectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/bookL', bookLRoutes);

app.use(errorHandlerMiddleware);

app.get('/example-error', (req, res, next) => {
  next(new CustomError('Example error', 500));
});

const port: string = (process.env.PORT as string);

const startServer = async () => {
  try {
    await connectToMongoDB();

    // Additional setup or routes can be added here

    app.get('/', (req, res) => {
      res.send('Blackhole API');
    });

    app.listen(port, () => {
      console.log(`Express is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();