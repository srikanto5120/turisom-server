const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.efvjx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("tourism");
    const tourCollection = database.collection("places");
    const hotelCollection = database.collection("hotels");
    // tour place get api
    console.log("connected");
    app.get("/places", async (req, res) => {
      const result = await tourCollection.find({}).toArray();
      console.log("connected");

      res.send(result);
    });

    //hotel get api
    app.get("/hotels", async (req, res) => {
      const result = await hotelCollection.find({}).toArray();

      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Running the server on ", port);
});
//this isa a home
