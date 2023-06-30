const {User, Thought} = require('../models');

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const userData = await User.find()
            .populate({
                path: 'thoughts',
                select: '-__v'
            });
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get one user by id
    async getUserById(req, res) {
        try {
        const singleUser = await User.findOne({_id: req.params.id})
        .populate({ path: 'thoughts', select: '-__v' });

        if (!singleUser) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(singleUser);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    // create user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update user by id
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                {_id: req.params.id},
                req.body,
                {new: true}
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete user
    // BONUS: Remove a user's associated thoughts when deleted.
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete({_id: req.params.id})
            Thought.deleteMany({_id: {$in: deletedUser.thoughts} });
            if (!deletedUser) {
                return res.status(404).json({ message: 'No user found with this id!' })
            }
            res.json({ message: 'User deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // add friend
    async addFriend(req, res) {
        try {
            const addFriend = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.params.friendId}},
                {new: true}
            )
            if (!addFriend) {
                return res.status(404).json({ message: req.params.userId + 'No user found with this id' });  
            }
            res.json({ message: 'Friend added!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // remove friend
    async removeFriend(req, res) {
        try {
            const removeFriend = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                {new: true}
            )
            if (!removeFriend) {
                return res.status(404).json({ message: 'No user found with this id!' });  
            }
            res.json({ message: req.params.friendId + 'Friend removed!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};

