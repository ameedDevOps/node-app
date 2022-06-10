const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const connectDb = require('./config/db');
const cors = require('cors');

//Connect DATABASE
connectDb();

//Init Middileware
app.use(express.json({ extended: false }));
app.use(cors());

//Define Routes
app.use('/api/users', require('./routes/api/users'));

app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});
