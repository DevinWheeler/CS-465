const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        const user = new User({ name, email });
        user.setPassword(password);
        await user.save();

        const token = user.generateJwt();

        res.status(201).json({ token });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res
                .status(404)
                .json(err);
        }
        if (user) {
            const token = user.generateJwt();
            res
                .status(200)
                .json({ token });
        } else {
            res
                .status(401)
                .json(info);
        }
    })(req, res);
};
module.exports = {
    register,
    login
};