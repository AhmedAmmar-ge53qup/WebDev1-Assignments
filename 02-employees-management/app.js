import express from 'express';
import morgan from 'morgan';
import router from './router.js';
import mongoose from "mongoose";

const port = process.env.PORT || 9090;
const app = express();

const uri = 'mongodb://127.0.0.1:27017/assignment5DB';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(uri, options, () => {
    console.log("Connected to database successfully");
});

app.use(express.static('public'));
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api', router);

app.listen(port, () => console.log(`server listening on http://localhost:${port}`));
