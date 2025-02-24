const mongoose = require('mongoose');
const newsModel = mongoose.model('news');

const newsList = async (req, res) => {
    newsModel
        .find({})
        .exec((err, news) => {
            if (!news) {
                return res
                    .status(404)
                    .json({ message: 'news not found' });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(news);
            }
        });
};
const newsFindCode = async (req, res) => {
    newsModel
        .find({ 'code': req.params.newsCode })
        .exec((err, news) => {
            if (!news) {
                return res
                    .status(404)
                    .json({ message: 'news not found with code ' + req.params.newsCode });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(news);
            }
        });
};

module.exports = {
    newsList,
    newsFindCode
};