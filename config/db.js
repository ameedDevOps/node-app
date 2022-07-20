const mongoose = require("mongoose");
const {
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};
const config = require("config");
const db = config.get("url");

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(url, options).then( function() {
  console.log('MongoDB is connected');
})
  .catch( function(err) {
  console.log(err);
});

//const connectDb = async() => {
 //   try {
 //       await mongoose.connect(db);
  //      console.log("MongDB Connected...");
  //  } catch (error) {
  //      console.error(error.message);
  //      //Exit process with failure.
  //      process.exit(1);
  //  }
//};

//module.exports = connectDb;
