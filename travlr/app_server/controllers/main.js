const fs = require('fs');
const mainPage = JSON.parse(fs.readFileSync('app_server/data/index.json', 'utf8'));

/* GET home page. */
const index = (req, res) => {
    pageTitle ='Travlr Getaways | Home';
    res.render('index', {title: pageTitle, mainPage });
};

module.exports = {
    index
};