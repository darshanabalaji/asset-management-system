const express = require('express');
const sequelize = require('./config/database');
const Category = require('./models/Category');
const Employee= require('./models/Employee');
const Asset = require('./models/Asset');
const Issue = require('./models/Issue');
const Return = require('./models/Return');
const Scrap= require('./models/Scrap');
const {Op} = require('sequelize');



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

app.get('/add-employee',(req,res)=>{
    res.render('employees/add');
});

app.post('/add-employee', async (req, res) => {

    await Employee.create({
        employee_name: req.body.employee_name,
        employee_code: req.body.employee_code,
        email: req.body.email,
        phone: req.body.phone,
        department: req.body.department
    });

    res.send('Employee Added Successfully');

});

app.get('/employees', async (req, res) => {

    const employees = await Employee.findAll();

    res.render('employees/index', {
        employees: employees
    });

});

app.get('/employees/edit/:id', async (req, res) => {

    const employee = await Employee.findByPk(req.params.id);

    res.render('employees/edit', {
        employee: employee
    });

});

app.post('/employees/update/:id', async (req, res) => {

    await Employee.update(
        {
            employee_code: req.body.employee_code,
            employee_name: req.body.employee_name,
            email: req.body.email,
            phone: req.body.phone,
            department: req.body.department
        },
        {
            where: {
                employee_id: req.params.id
            }
        }
    );

    res.redirect('/employees');

});

app.get('/employees/search', async (req, res) => {

    const keyword = req.query.keyword;

    const employees = await Employee.findAll({
        where: {
            employee_name: {
                [Op.iLike]: '%' + keyword + '%'
            }
        }
    });

    res.render('employees/index', {
        employees: employees
    });

});

app.get('/add-asset', (req, res) => {
    res.render('assets/add');
});

app.post('/add-asset', async (req, res) => {

    await Asset.create({
        asset_name: req.body.asset_name,
        asset_code: req.body.asset_code,
        serial_number: req.body.serial_number,
        asset_value: req.body.asset_value,
        purchase_date: req.body.purchase_date
    });

    res.send('Asset Added Successfully');

});

app.get('/assets', async (req, res) => {

    const assets = await Asset.findAll();

    res.render('assets/index', {
        assets: assets
    });

});

app.get('/assets/edit/:id', async (req, res) => {

    try {

        console.log("ID =", req.params.id);

        const asset = await Asset.findOne({
            where: {
                asset_id: req.params.id
            }
        });

        console.log("ASSET =", asset);

        res.render('assets/edit', {
            asset: asset
        });

    } catch (err) {

        console.log("ERROR =", err.message);

        res.send(err.message);

    }

});

app.post('/assets/update/:id', async (req, res) => {

    await Asset.update(
        {
            asset_name: req.body.asset_name,
            asset_code: req.body.asset_code,
            serial_number: req.body.serial_number,
            asset_value: req.body.asset_value,
            purchase_date: req.body.purchase_date
        },
        {
            where: {
                asset_id: req.params.id
            }
        }
    );

    res.redirect('/assets');

});

app.get('/assets/delete/:id', async (req, res) => {

    await Asset.destroy({
        where: {
            asset_id: req.params.id
        }
    });

    res.redirect('/assets');

});

app.get('/assets/search', async (req, res) => {

    const keyword = req.query.keyword;

    const assets = await Asset.findAll({
        where: {
            asset_name: {
                [Op.iLike]: '%' + keyword + '%'
            }
        }
    });

    res.render('assets/index', {
        assets: assets
    });

});

app.get('/stock', async (req, res) => {

    const assets = await Asset.findAll();

    res.render('assets/stock', {
        assets: assets
    });

});

app.get('/issue-asset', (req, res) => {
    res.render('assets/issue');
});

app.post('/issue-asset', async (req, res) => {

    await Issue.create({
        employee_name: req.body.employee_name,
        asset_name: req.body.asset_name,
        issue_date: req.body.issue_date
    });

    await Asset.update(
        {
            status: 'Issued'
        },
        {
            where: {
                asset_name: req.body.asset_name
            }
        }
    );

    res.send('Asset Issued Successfully');

});

app.get('/return-asset', (req, res) => {
    res.render('assets/return');
});

app.post('/return-asset', async (req, res) => {

    await Return.create({
        employee_name: req.body.employee_name,
        asset_name: req.body.asset_name,
        return_date: req.body.return_date
    });

    await Asset.update(
        {
            status: 'In Stock'
        },
        {
            where: {
                asset_name: req.body.asset_name
            }
        }
    );

    res.send('Asset Returned Successfully');

});

app.get('/scrap-asset', (req, res) => {
    res.render('assets/scrap');
});

app.post('/scrap-asset', async (req, res) => {

    await Scrap.create({
        asset_name: req.body.asset_name,
        scrap_date: req.body.scrap_date
    });

    await Asset.update(
        {
            status: 'Scrapped'
        },
        {
            where: {
                asset_name: req.body.asset_name
            }
        }
    );

    res.send('Asset Scrapped Successfully');

});

app.get('/asset-history', async (req, res) => {

    const issues = await Issue.findAll();
    const returns = await Return.findAll();
    const scraps = await Scrap.findAll();

    res.render('assets/history', {
        issues,
        returns,
        scraps
    });

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