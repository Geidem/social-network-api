const {Schema, model} = require('mongoose');

const userSchema = new Schema ({
    username: 
    {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address!']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

const User = model('User', userSchema);

userSchema.virtual('friendcount').get(function() {
    return this.friends.length;
});



module.exports = User;