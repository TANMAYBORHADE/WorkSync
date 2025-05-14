require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT||3000;
const authRoutes = require('./routes/auth-routes')
const homeRoutes = require('./routes/home-routes')


const connectToDB = require('./database/db')
connectToDB();

app.use(express.json());

app.use('/api/auth',authRoutes)

app.use('/api/home',homeRoutes)

app.listen(PORT,()=>{
    console.log(`Server is now running...`);
})