const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const pokemonSchema = new Schema(
    {
        pokemonName: {
            type: String,
            required: 'You need to add a name!',
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        level: {
            type: Number,
            required: true,
            trim: true,
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);


const Pokemon = model('Pokemon', pokemonSchema);

module.exports = Pokemon;
