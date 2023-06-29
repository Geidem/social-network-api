const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thought-controller');
const { route } = require('./user-routes');

router.route('/').get(getAllThoughts);

router.route('/:id').post(createThought);

router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)

router
.route('/userId/thoughtId')
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.post(addReaction);

router 
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;