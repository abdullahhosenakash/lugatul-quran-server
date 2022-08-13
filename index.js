const express = require('express');
const cors = require('cors');
const fs = require('fs');
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

        const wordCollection = client.db("lugatulQuran").collection("arabicDictionary");
        const adminCollection = client.db("lugatulQuran").collection("admin");

        app.post('/postWord', async (req, res) => {
            const newWord = req.body;
            const result = await wordCollection.insertOne(newWord);
            res.send(result);
        });

        app.get('/getWord/:searchedText', async (req, res) => {
            const searchedText = req.params.searchedText;
            const cursor = wordCollection.find({});
            const wordList = await cursor.toArray();
            const result = wordList.filter(word => word.arabicWord.startsWith(searchedText));
            if (result) {
                res.send({ result });
            }
            else {
                res.send('0');
            }
        });

        app.post('/isAdmin', async (req, res) => {
            const secretKey = req.body.secret;
            const result = await adminCollection.findOne({ adminSecret: secretKey });
            if (result) {
                res.send('1');
            }
            else {
                res.send('0');
            }
        })
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