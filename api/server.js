const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const CodeSchema = new mongoose.Schema({
  code: String,
  date: { type: Date, default: Date.now },
  products: [{ name: String, quantity: Number, price: Number }],
});

const Code = mongoose.model('Code', CodeSchema);

app.post('/api/codes', (req, res) => {
  const newCode = new Code(req.body);
  newCode.save((err, code) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(code);
  });
});

app.get('/api/codes', (req, res) => {
  Code.find({}, (err, codes) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(codes);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
