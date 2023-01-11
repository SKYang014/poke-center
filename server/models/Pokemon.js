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
        },
        species: {
            type: String,
            required: true,
            trim: true
        },
        pokeDexId: {
            type: Number,
            required: true,
            trim: true
        },
        photo: {
            type: String,
            trim: true
        },
        bigPhoto: {
            type: String,
            trim: true
        },
        shiny: {
            type: Boolean,
            trim: true
        },
        description: {
            type: String,
            trim: true
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
