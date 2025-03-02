const fs = require('fs');
const path = require('path');
const api = 'http://localhost:3000';

/* Render room list view */
const renderRoomList = (req, res, responseBody) => {
    let message = null;
    let rooms = Array.isArray(responseBody) && responseBody.length ? responseBody : [];
    let pageTitle = `Travlr Getaways | Rooms`;

    if (!rooms.length) {
        message = 'No rooms found. Showing local backup.';
    }

    res.render('rooms', {
        title: pageTitle,
        rooms,
        message
    });
};

/* Load local room data if API fails */
const loadLocalRooms = () => {
    console.log('Loading local rooms...');
    try {
        const filePath = path.join(__dirname, '../data/rooms.json');
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading local rooms:', error);
        return [];
    }
};

/* GET room list with API fallback */
const roomList = async (req, res) => {
    const pathUrl = '/api/rooms';
    const url = `${api}${pathUrl}`;

    console.log(`Inside roomsController.roomList calling ${url}`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const body = await response.json();
        const rooms = Array.isArray(body) && body.length ? body : loadLocalRooms();
        const message = !Array.isArray(body) || !body.length ? 'No rooms found. Loading local backup.' : null;

        renderRoomList(req, res, rooms);
    } catch (error) {
        console.error('Fetch failed, loading local backup:', error);
        renderRoomList(req, res, loadLocalRooms());
    }
};

module.exports = {
    roomList
};
