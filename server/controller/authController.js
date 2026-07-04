const User = require('../model/User');
const Task = require('../model/Task');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const findExist = await User.findOne({ email });
        if (findExist) return res.status(400).json({ message: "Email already exists" });
        let user = await User.create({
            name,
            email,
            password
        });
        res.status(200).json({ message: 'Register Successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        if (password !== user.password) return res.status(400).json({ message: 'Invalid credentials' });
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.taskStore = async (req, res) => {
    try {
        const { title, desc } = req.body;

        let task = await Task.create({
            title,
            desc,
            user: req.user._id
        });

        res.status(200).json({ message: 'Task Submitted' });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
}
exports.getTask = async (req, res) => {
    try {
        const task = await Task.find({
            user: req.user._id
        });

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
}

exports.updateTask = async (req, res) => {
    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        // Check ownership
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: 'Not authorized'
            });
        }

        task.title = req.body.title || task.title;
        task.desc = req.body.desc || task.desc;

        const updatedTask = await task.save();

        res.status(200).json(updatedTask);

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        // Check ownership
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: 'Not authorized'
            });
        }

        await task.deleteOne();

        res.status(200).json({
            message: 'Task deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};

exports.forgotPassword = async (req, res) => {
    try {

        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Generate token
        const resetToken = crypto
            .randomBytes(20)
            .toString('hex');

        user.resetPasswordToken = resetToken;

        user.resetPasswordExpire =
            Date.now() + 10 * 60 * 1000;

        await user.save();

        const resetUrl =
            `http://localhost:5173/reset-password/${resetToken}`;

        const message = `
You requested a password reset.

Click the link below:

${resetUrl}

This link will expire in 10 minutes.
`;

        await sendEmail({
            email: user.email,
            subject: 'Password Reset Request',
            message
        });

        res.status(200).json({
            message: 'Reset email sent successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {

        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpire: {
                $gt: Date.now()
            }
        });

        if (!user) {
            return res.status(400).json({
                message: 'Token is invalid or expired'
            });
        }

        user.password = req.body.password;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            message: 'Password reset successful'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};