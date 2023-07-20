const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    sold: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        required: true,
    },
    images: [
        {
            public_id: String,
            url: String,
        }
    ],
    tags: {
        type: String,
    },
    Color: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Color",
        }
    ],
    ratings: [
        {
            star: Number,
            comment: String,
            postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
    ],
    totalrating: {
        type: String,
        default: 0,
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
module.exports = mongoose.model('Product', productSchema);