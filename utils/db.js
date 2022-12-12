import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log('already connected');
    return; /* stop the function because we are already connected */
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use of the previous connection was successful');
      return;
    }
    console.log('disconnecting and preparing to create a another connection');
    await mongoose.disconnect();
  }
  console.log('Creating a new connection to the DB');
  const db = await mongoose.connect(process.env.MONGODB_URI);
  connection.isConnected = db.connections[0].readyState;
  console.log('Connection created sucessfully');
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('Not Disconnected');
    }
  }
}

const db = { connect, disconnect };

export default db;
