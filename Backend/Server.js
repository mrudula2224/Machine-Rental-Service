const express = require('express');
const cors = require('cors');

  
const app = express();
const port = 2000;

// Middleware
app.use(cors()); 
app.use(express.json()); // parse json data

//Routes
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const machineRoutes = require('./routes/machineRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const feedbackRoutes = require('./routes/feedBackRoutes');

app.use('/api/admin',adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/machines',machineRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/feedback', feedbackRoutes);

//default root (testing)
app.get('/',(req,res) => {
    res.send("MAchine Rental Service API Running");
})

// 404 error handler
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        error: "Route Not Found"
    });
});

app.listen(port, '0.0.0.0',() => {
    console.log(`Server starts at PORT : ${port}`);
})