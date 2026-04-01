const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

const MONGOURL =
  "mongodb+srv://kunal8235823516kumar_db_user:Airbnb_123@cluster0.0lesqxw.mongodb.net/?appName=Cluster0";


  let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGOURL)
    .then((client) => {
      console.log("Connected to MongoDB");
        _db = client.db('airbnbDB');
      callback();
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;