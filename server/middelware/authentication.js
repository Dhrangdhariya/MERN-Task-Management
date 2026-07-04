const JWT = require('jsonwebtoken');
const user = require('../model/User');

const protect = async (req, res, next) => {
    let token = req.headers.authorization;

    console.log("Authorization Header:", token);

    if (token && token.startsWith('Bearer')) {
        try {
            token = token.split(' ')[1];

            console.log("Token:", token);

            const decode = JWT.verify(token, process.env.JWT_KEY);

            console.log("Decoded:", decode);

            req.user = await user.findById(decode.id)
                .select('-password');

            if (!req.user) {
                return res.status(401).json({
                    message: 'Not authorized, user not found'
                });
            }

            next();

        } catch (error) {
            console.log(error);
            res.status(401).json({
                message: 'Not authorized, token failed'
            });
        }
    } else {
        res.status(401).json({
            message: 'Not authorized, no token'
        });
    }
};
module.exports = { protect };