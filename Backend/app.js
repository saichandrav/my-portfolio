
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const engine = require('ejs-mate');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://http://localhost:27017/myportfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true   
}).then(() => {
    console.log('Connected to MongoDB');
}
).catch(err => {
    console.error('Error connecting to MongoDB', err);
}   
);

// Set EJS as templating engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('index');
}   
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);
