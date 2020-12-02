const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const initMongo = require("./utils/db")();

const app = express();

// body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

const whitelist = [process.env.FRONTEND_URL, 'http://localhost:3000', process.env.VERCEL_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions));

// route middleware
app.use("/api/user", require("./routes/user"));

app.use("/auth", require("./routes/auth"));

if (process.env.NODE_ENV !== "dev") {
  app.use(express.static(path.join(__dirname, "..", "client", "public")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "client", "public", "index.html"));
  });
}

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
