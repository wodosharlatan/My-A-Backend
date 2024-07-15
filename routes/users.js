const express = require("express");
const router = express.Router();



function IsNullorEmptyOrUndefined(str) {
    return str === null || str === undefined || (typeof str === 'string' && str.trim() === "");
}

function checkPhoneNumber(phoneNumber) {
	const phoneRegex = /^\+?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{3})$/;
	return !phoneRegex.test(phoneNumber) || phoneNumber.length !== 11;
}


router.post("/register", (req, res) => {
	// check if each field is not null, empty, or undefined
	for (const key in req.body) {
		if (IsNullorEmptyOrUndefined(req.body[key])) {
			if(key === "parentNumber2") {
				continue;
			}

			return res.json({ message: `${key} is required` });
		}
	}

	// check if name is a string
	if (typeof req.body.name !== "string") {
		return res.json({ message: "Name must be a string" });
	}

	// check czech phone number
	const personalNumber = req.body.personalNumber;
	const parentNumber = req.body.parentNumber;


	
	const parentNumber2 = req.body.parentNumber2;

	if (checkPhoneNumber(personalNumber)) {
		return res.json({ message: "Invalid Personal phone number" });
	}

	if (checkPhoneNumber(parentNumber)) {
		return res.json({ message: "Invalid Parent phone number" });
	}

	if(IsNullorEmptyOrUndefined(req.body.parentNumber2) == false) {
		if (checkPhoneNumber(parentNumber2)) {
			return res.json({ message: "Invalid Parent 2 phone number" });
		}
	}





	return res.json({ message: "All fields are valid!" });

});

module.exports = router;