const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const messages = require("../../utils/messages");
const User = require("../../models/Users");
const gravatar = require("gravatar");
const req = require("express/lib/request");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const statusCode = require("../../utils/status-code");

const validationArray = [
    check("name", messages.name).not().isEmail(),
    check("email", messages.email).isEmail(),
    check("password", messages.password).isLength({ min: 6 }),
];

router.post("/", validationArray, async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(statusCode.badRequest).json({ error: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({
            email,
        });

        if (user) {
            return res
                .status(statusCode.badRequest)
                .json({ error: [{ msg: messages.userExist }] });
        }

        const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm",
        });

        user = new User({
            name,
            email,
            avatar,
            password,
        });

        const salt = await bycrypt.genSalt(10);

        user.password = await bycrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            config.get("jwtSecret"), { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.status(statusCode.success).json({ token });
            }
        );
    } catch (error) {
        console.error(error.message);
        return res.status(statusCode.ServerError).send("Server Error");
    }
});

module.exports = router;