const { Storage } = require("@google-cloud/storage");
const path = require("path");

const storage = new Storage({
  // keyFilename: path.join(__dirname, "../config/firebase-service-account.json"),
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  projectId: "authentication-249f3",
});

const bucket = storage.bucket("authentication-249f3.appspot.com");

module.exports = { bucket };
