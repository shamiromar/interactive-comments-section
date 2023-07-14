const db = mongoose
  .connect(
    "mongodb+srv://shamiroomar:shamiro43@cluster0.kbkujwz.mongodb.net/interactiveComments?retryWrites=true&w=majority",
    connectionParams
  )
  .then(() => {
    console.log(`Connected to MongoDB database`);
  })
  .catch((err) => console.log("Error connecting to the database", err));

module.exports = db;
