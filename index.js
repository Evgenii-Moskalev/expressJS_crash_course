const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const logger = require('./middleware/logger.js');
const members = require('./Members.js')



const app = express();
const PORT = process.env.PORT || 5000;


// Initialize middleware
// app.use(logger);

// Handlebars middleware
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// Body Parser Middleware initializing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage Route 
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    // members: members
    members
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


// Member API Routes
app.use('/api/members', require('./routes/api/members'));


app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));