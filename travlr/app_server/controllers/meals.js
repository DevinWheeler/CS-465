const fs = require('fs');
const path = require('path');
const api = 'http://localhost:3000';

/* Render meal list view */
const renderMealList = (req, res, responseBody) => {
    let message = null;
    let meals = Array.isArray(responseBody) && responseBody.length ? responseBody : [];
    let pageTitle = `Travlr Getaways | Meals`;

    if (!meals.length) {
        message = 'No meals found. Showing local backup.';
    }

    res.render('meals', {
        title: pageTitle,
        meals,
        message
    });
};

/* Load local meal data if API fails */
const loadLocalMeals = () => {
    try {
        const filePath = path.join(__dirname, '../data/meals.json');
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading local meals:', error);
        return [];
    }
};

/* GET meal list with API fallback */
const mealList = async (req, res) => {
    const pathUrl = '/api/meals';
    const url = `${api}${pathUrl}`;

    console.log(`Inside mealsController.mealList calling ${url}`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const body = await response.json();
        const meals = Array.isArray(body) && body.length ? body : loadLocalMeals();
        const message = !Array.isArray(body) || !body.length ? 'No meals found. Loading local backup.' : null;

        renderMealList(req, res, meals);
    } catch (error) {
        console.error('Fetch failed, loading local backup:', error);
        renderMealList(req, res, loadLocalMeals());
    }
};

module.exports = {
    mealList
};
