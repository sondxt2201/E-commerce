const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogcategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String,
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

//Export the model
module.exports = mongoose.model('blogCategory', blogcategorySchema);
