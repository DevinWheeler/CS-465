const fs = require('fs');
const path = require('path');

const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

/* Load local trip data if API fails */
const loadLocalTrips = () => {
    try {
        const filePath = path.join(__dirname, '../data/trips.json');
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading local trips:', error);
        return [];
    }
};

/* Get Travel Views with API fallback */
const travel = async function (req, res, next) {
    try {
        const response = await fetch(tripsEndpoint, options);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const json = await response.json();
        let message = null;
        let trips = Array.isArray(json) && json.length ? json : loadLocalTrips();

        if (!trips.length) {
            message = 'No trips found. Loading local backup.';
        }

        res.render('travel', { title: 'Travlr Getaways | Travel', trips, message });
    } catch (err) {
        console.error('Fetch failed, loading local backup:', err);
        res.render('travel', { 
            title: 'Travlr Getaways | Travel', 
            trips: loadLocalTrips(), 
            message: 'API unavailable. Showing local backup.' 
        });
    }
};

module.exports = {
    travel
};
