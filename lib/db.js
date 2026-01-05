import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URL; //.env theke db url niye save kora hoi

let isConnected = false;

const dbConnect = async () => {
  //jodi mongoDB age thekei connected thek then message print hobe, ar function okhanei stop hoye jbe.
  if (isConnected) {
    console.log("Mongodb is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI); // mongo db ar sathe connection koro
    isConnected = db.connections[0].readyState === 1; // ai line bole DB successfully connected hoyeche ar isConnected k true korer
    // db.connections[0] ar mane 1st DB connection object jta mongoDB baniyeche.
    // readyState === 1 ar mane connection hoye gache
    console.log("connected to mongodb:", db); // console aa success message print kore
  } catch (error) {
    console.error("Faild to connect to mongodb:", error); // error print kore
    throw error; // app bujhte paare j kichu akta vul hoye6e.
  }
};

export default dbConnect;
