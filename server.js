// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// --- DB connection ---
await mongoose.connect(process.env.MONGO_URL);

// --- Mongoose model ---
const Item = mongoose.model('Item', new mongoose.Schema({ name: String }));

// --- Routes ---
app.get('/', (_req, res) => res.send('👋 Hello, CI/CD!'));

app.get('/items', async (_req, res) => {
  res.json(await Item.find());
});

app.post('/items', async (req, res) => {
  const doc = await Item.create({ name: req.body.name });
  res.status(201).json(doc);
});

// --- Start server (Jest imports skip this) ---
if (!module.parent) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on ${port}`));
}

export default app;
