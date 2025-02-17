require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

//import routes
const pageRoutes = require('./routes/pages')


//middleware
app.use(cors()); // allow frontend to communicate
app.use(express.json());  //parse JSON requests

//test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.get('/courses', pageRoutes)
app.get('/addcourse', pageRoutes)
app.get('/viewcourse', pageRoutes)
app.get('/editcourse', pageRoutes)
app.get('/teacherpage', pageRoutes)
app.get('/studentpage', pageRoutes)
app.get('/*', pageRoutes)


//Start server

app.listen(PORT, () => {console.log(`Server running on http://localhost:${PORT}`)
});

