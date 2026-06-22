const express = require('express');
const sequelize = require('./config/database');
const Category = require('./models/Category');

const app = express();

app.use(express.urlencoded({extended: true}));
app.set('view engine','pug');
app.set('views','./views');

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully!');
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });

// Create tables from models
sequelize.sync()
    .then(() => {
        console.log('Database synchronized successfully!');
    })
    .catch((err) => {
        console.error('Database sync failed:', err);
    });

// Home page
app.get('/', (req, res) => {
    res.send('Welcome to Asset Management System');
});

// Start server
app.post('/add-category',async(req,res)=>{
    await Category.create({
        category_name:req.body.category_name
    });
    res.redirect('/categories');
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/categories',async(req, res)=>{
    const categories = await Category.findAll();
    res.render('categories/index',{
        categories:categories
    });
});

app.get('/add-category',(req,res)=>{
    res.render('categories/add');
});