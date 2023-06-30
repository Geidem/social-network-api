const {User, Thought} = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json({message: 'trouble finding all thoughts'});
        }
    },
            
    // get one thought by id
    async getThoughtById(req, res) {
        try {
            const singleThought = await Thought.findOne({_id: req.params.userId});
            if (!singleThought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(singleThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create thought
    async createThought(req, res) {
        try {
            const { thoughtText, username } = req.body;
            const newThought = await Thought.create({ thoughtText, username });
            await User.findOneAndUpdate(
                { _id: userId },
                { $push: { thoughts: newThought.userId } },
                { new: true }
            );

            res.status(201).json( {message: 'Thought created successfully!'});
        } catch (err) {
            res.status(500).json({message: req.params.userId});
        }
    },
    // update thought by id
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                {_id: req.params.userId},
                req.body,
                {new: true}
            );
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json({message: req.params.userId});
        }
    },
    // delete thought
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({_id: req.params.userId});
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(deletedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // add reaction
    async addReaction(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                {_id: req.params.id},
                {$push: {reactions: req.body}},
                {new: true}
            );
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete reaction
    async deleteReaction(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                {_id: req.params.id},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {new: true}
            );
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};