const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const port = process.env.port || 5000;
const app = express();

//Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //10 mins
    max: 100
})
app.use(limiter);
app.set('trust proxy', 1);

//Set static folder
app.use(express.static('CLIENT'));

//routes
app.use('/rapidapi', require('./routes'))

// Enable cors
app.use(cors());

app.listen(port, () => console.log(`Server running on port ${port}`));