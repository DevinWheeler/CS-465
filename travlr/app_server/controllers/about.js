const fs = require('fs');
const aboutPage = JSON.parse(fs.readFileSync('app_server/data/about.json', 'utf8'));

/* GET about view. */
const about = (req, res) => {
    pageTitle = 'Travlr Getaways | About';
    res.render('about', { title: pageTitle , aboutPage});
};

module.exports = {
    about
};