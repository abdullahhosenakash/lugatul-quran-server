const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2ndhaz4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const wordCollection = client.db("lugatulQuran").collection("arabicDictionary");
    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
    res.send('Lugatul Quran Running');
});

app.listen(port, () => {
    console.log('Lugatul Quran Running on port', 5000);
});