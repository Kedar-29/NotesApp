const express = require('express');
const connectDB = require('./config/DbConfig');
const noteRoutes = require('./Routes/NoteRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/notes', noteRoutes);

const PORT = 5689;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
