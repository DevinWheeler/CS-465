const fs = require('fs');
const contactInfo = JSON.parse(fs.readFileSync('app_server/data/contact.json', 'utf8'));

/* GET contact view. */
const contact = (req, res) => {
    pageTitle = 'Travlr Getaways | Contact';
    res.render('contact', { activePage: 'contact', title: pageTitle, contactInfo });
};

module.exports = {
    contact
};