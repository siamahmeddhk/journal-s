import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://journaldb:xupAgdi1NTemeOU3@cluster0.w6vpek4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


   
    const db = client.db('journaldb')
    const journalcollection = db.collection('journals')



    app.post('/journals', async(req, res)=>{
      const journal = req.body
      const result = await journalcollection.insertOne(journal)
      res.send(result)
    })


    app.get('/journals', async(req,res)=>{
      const journals = await journalcollection.find().sort({createAt: -1}).toArray()
      res.send(journals)
    })




    
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);











// Add root route
app.get('/', (req, res) => {
  res.send('📝 My Journal Server is Running...');
});

app.listen(port, () => {
  console.log(`🚀 Server is listening on http://localhost:${port}`);
});
