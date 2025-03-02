const Mongoose = require('./db');
const Trip = require('./travlr');

var fs = require('fs');
var trips =JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log("Database Seeded");
}

seedDB().then(async () => {
    Mongoose.connection.close();
    process.exit(0);
});