const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/purchaseHistory', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB();

const app = express();
app.use(bodyParser.json());

// Define a purchase schema and model
const purchaseSchema = new mongoose.Schema({
    code: Number,
    items: [{ название: String, количество: Number }],
    date: Date
});
const Purchase = mongoose.model('Purchase', purchaseSchema);

// Endpoint to save a purchase
app.post('/api/purchases', async (req, res) => {
    try {
        const newPurchase = new Purchase(req.body);
        const savedPurchase = await newPurchase.save();
        res.status(200).send(savedPurchase);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Endpoint to get all purchases
app.get('/api/purchases', async (req, res) => {
    try {
        const purchases = await Purchase.find();
        res.status(200).send(purchases);
    } catch (err) {
        res.status(500).send(err);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
