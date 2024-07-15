// Import .env variables
require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const mongoose = require("mongoose");
const cors = require("cors");

// SSL
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

// CORS
app.use(cors());

app.post("/", (req, res) => {
	res.json({ message: "Hello World!" });

});

function IsNullorEmptyOrUndefined(str) {
    return str === null || str === undefined || (typeof str === 'string' && str.trim() === "");
}


app.post("/users/register", (req, res) => {
	// check if each field is not null, empty, or undefined
	for (const key in req.body) {
		if (IsNullorEmptyOrUndefined(req.body[key])) {
			return res.json({ message: `${key} is required` });
		}
	}

	return res.json({ message: "All fields are valid!" });

});

app.get("/", (req,res) => {
	res.json({message: "Hello World! "});
})

app.listen(PORT, HOST, () => {
		console.log(`Server is running on http://${HOST}:${PORT}`);
});

mongoose
		.connect(process.env.DB_CONNECTION)
		.then(() => console.log("Connected to MongoDB!"))
		.catch((error) => console.error("Error connecting to MongoDB", error));