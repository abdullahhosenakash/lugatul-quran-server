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



        app.get('/getWord/:searchedText', async (req, res) => {
            const searchedText = req.params.searchedText;
            const cursor = wordCollection.find({});
            const wordList = await cursor.toArray();
            const result = wordList.filter(word => word.arabicWord.startsWith(searchedText));
            console.log(result);
            if (result) {
                res.send({ result });
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

app.get('/postWord/:text', async (req, res) => {
    const text = req.params.text;
    const updatedJSON = {
        "arabicWord": `${text}`,
        "banglaMeaning": "shariati updated"
    }
    // fs.writeFile('./arabicDictionary.json', JSON.stringify(updatedJSON), (err) => {
    //     if (err) console.log('Error writing file:', err);
    // })
})

app.get('/', async (req, res) => {
    res.send('Lugatul Quran Running');
});

app.listen(port, () => {
    console.log('Lugatul Quran Running on port', 5000);
});