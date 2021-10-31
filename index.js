const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
require("dotenv").config();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
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
    const roomCollection = database.collection("room");
    const bookingCollection = database.collection("booking-information");
    // tour place get api
    console.log("connected");
    app.get("/places", async (req, res) => {
      const result = await tourCollection.find({}).toArray();
      console.log();

      res.send(result);
    });

    // post booking information
    app.post("/booking-information", async (req, res) => {
      console.log(req.body);
      bookingCollection.insertOne(req.body).then((result) => {
        res.send(result.insertedId);
      });
    });

    /// get booking information
    app.get("/booking-information", async (req, res) => {
      const result = await bookingCollection.find({}).toArray();
      console.log("connected");

      res.send(result);
    });

    // get room api
    app.get("/room", async (req, res) => {
      const result = await roomCollection.find({}).toArray();
      console.log("connected");

      res.send(result);
    });

    //get    single api
    app.use("/place/singlePlace/:id", async (req, res) => {
      const id = req.params.id;
      const cursor = { _id: ObjectId(id) };
      const result = await tourCollection.findOne(cursor);
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
