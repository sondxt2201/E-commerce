const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            count: Number,
            color: String,
        },
    ],
    orderStatus: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Cash on Delivery", "Processing", "Dispatched", "Cancelled", "Delivered"],
    },
    paymentIntent: {},
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
}
);

//Export the model
module.exports = mongoose.model('Order', orderSchema);