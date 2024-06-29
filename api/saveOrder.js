const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    await client.connect();
    const database = client.db('purchaseHistory');
    const collection = database.collection('purchases');
    
    const order = req.body;
    const result = await collection.insertOne(order);

    res.status(200).json({ success: true, orderId: result.insertedId });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  } finally {
    await client.close();
  }
};
