require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT||3000;
const authRoutes = require('./routes/auth-routes')
const homeRoutes = require('./routes/home-routes')
const adminRoutes = require('./routes/admin-routes')
const uploadImageRoutes = require('./routes/image-routes')
const cors = require('cors')

const connectToDB = require('./database/db')
connectToDB();
app.use(cors({
    origin: 'http://127.0.0.1:5501',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));


  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Or your frontend domain
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

  // app.options('*', (req, res) => {
  //   res.sendStatus(200);
  // });
app.use(express.json());

app.use('/api/auth',authRoutes)

app.use('/api/home',homeRoutes)

app.use('/api/admin',adminRoutes)

app.use('/api/image',uploadImageRoutes)

app.listen(PORT,()=>{
    console.log(`Server is now running...`);
})