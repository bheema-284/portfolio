// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

if (!uri) {
    throw new Error("Please add your Mongo URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
    // Use global variable to prevent multiple connections in development
    if (!globalThis._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalThis._mongoClientPromise = client.connect();
    }
    clientPromise = globalThis._mongoClientPromise;
} else {
    // In production, create a new client
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
