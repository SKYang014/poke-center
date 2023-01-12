const { Schema, model } = require('mongoose');

const pokeDBSchema = new Schema(
    {
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
        shinyPhoto: {
            type: String,
            trim: true
        },
        bigPhoto: {
            type: String,
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


const PokeDB = model('PokeDB', pokeDBSchema);

module.exports = PokeDB;