const fs = require('fs');
const path = require('path');
const apiOptions = { server: 'http://localhost:3000' };

/* Render news list view */
const renderNewsList = (req, res, responseBody) => {
    let message = null;
    let pageTitle = `Travlr Getaways | News`;

    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else if (!responseBody.length) {
        message = 'No news found in database';
    }

    const latestNews = responseBody.filter(news => news.code.includes('LATEST'));
    const vacationTips = responseBody.filter(news => news.code.includes('TIPS'));
    const featured = responseBody.find(news => news.code.includes('FEATURED')) || null;

    res.render('news', {

        title: pageTitle,
        latestNews,
        vacationTips,
        featured,
        message
    });
};

/* Load local news data if API fails */
const loadLocalNews = () => {
    try {
        const filePath = path.join(__dirname, '../data/news.json');
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading local news:', error);
        return [];
    }
};

/* GET news list with API fallback */
const newsList = async (req, res) => {
    const pathUrl = '/api/news';
    const url = `${apiOptions.server}${pathUrl}`;

    console.log(`Inside newsController.newsList calling ${url}`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const body = await response.json();
        const news = Array.isArray(body) && body.length ? body : loadLocalNews();
        const message = !Array.isArray(body) || !body.length ? 'No news found. Loading local backup.' : null;

        renderNewsList(req, res, news);
    } catch (error) {
        console.error('Fetch failed, loading local backup:', error);
        renderNewsList(req, res, loadLocalNews());
    }
};

module.exports = {
    newsList
};
