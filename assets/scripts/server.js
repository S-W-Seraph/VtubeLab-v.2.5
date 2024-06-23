const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/purchaseHistory', { useNewUrlParser: true, useUnifiedTopology: true });

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
app.post('/api/purchases', (req, res) => {
    const newPurchase = new Purchase(req.body);
    newPurchase.save((err, savedPurchase) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(savedPurchase);
    });
});

// Endpoint to get all purchases
app.get('/api/purchases', (req, res) => {
    Purchase.find({}, (err, purchases) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(purchases);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
