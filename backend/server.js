// Import .env variables
require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// SSL
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

// CORS
app.use(cors());

// Parse JSON
app.use(bodyParser.json());

app.post("/", (req, res) => {
	res.json({ message: "Hello World!" });

});

app.listen(PORT, HOST, () => {
		console.log(`Server is running on http://${HOST}:${PORT}`);
});

mongoose
		.connect(process.env.DB_CONNECTION)
		.then(() => console.log("Connected to MongoDB!"))
		.catch((error) => console.error("Error connecting to MongoDB", error));