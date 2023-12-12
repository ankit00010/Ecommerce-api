const express = require('express');

const errorHandler = require('./middleware/errorHandler');

const connectDB = require('./config/dbConnection');

const dotenv = require('dotenv').config();
connectDB();
const app = express();

const port = 5000 || process.env.PORT;




app.use(express.json());

// app.use('/api/buyers', require('./routes/buyerRoutes'));
// app.use('/api/sellers', require('./routes/sellerRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});