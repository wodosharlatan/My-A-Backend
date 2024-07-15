const express = require("express");
const router = express.Router();
const User = require("../models/userModel");


function IsNullorEmptyOrUndefined(str) {
    return str === null || str === undefined || (typeof str === 'string' && str.trim() === "");
}

function checkPhoneNumber(phoneNumber) {
	const phoneRegex = /^\+?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{3})$/;
	return !phoneRegex.test(phoneNumber) || phoneNumber.length !== 11;
}


router.post("/register", async(req, res) => {

    // check if the personal number is already in the database
    if (await User.findOne({ personalNumber: req.body.personalNumber })) {
        return res.json({ message: "Personal number already exists" });
    }


	// check if each field is not null, empty, or undefined
	for (const key in req.body) {
		if (IsNullorEmptyOrUndefined(req.body[key])) {
			if(key === "parentNumber2" || key === "class") {
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
	let parentNumber2 = req.body.parentNumber2;


    // check if phone numbers are valid
	if (checkPhoneNumber(personalNumber)) {
		return res.json({ message: "Invalid Personal phone number" });
	}

	if (checkPhoneNumber(parentNumber)) {
		return res.json({ message: "Invalid Parent phone number" });
	}

	if(IsNullorEmptyOrUndefined(parentNumber2) == false) {
		if (checkPhoneNumber(parentNumber2)) {
			return res.json({ message: "Invalid Parent 2 phone number" });
		}
        else {
            parentNumber2 = req.body.parentNumber2.trim().toLowerCase();
        }
	}
    else {
        parentNumber2 = null;
    }

    const password = req.body.password;

    // check if trimed password is longer than 8 characters
    if (password.trim().length < 8) {
        return res.json({ message: "Password must be at least 8 characters long" });
    }

    // check if passwords match
    if (password !== req.body.confirmPassword) {
        return res.json({ message: "Passwords do not match" });
    }


    // trim all fields and put them to lowercase
    const validatedName = req.body.name.trim().toLowerCase();
    const validatedPersonalNumber = personalNumber.trim().toLowerCase();
    const validatedParentNumber = parentNumber.trim().toLowerCase();
    const validatedParentNumber2 = parentNumber2;
    const validatedPassword = password.trim().toLowerCase();
    const validatedClass = req.body.class.trim().toLowerCase();

    // create a new user
    const newUser = {
        name: validatedName,
        personalNumber: validatedPersonalNumber,
        parentNumber: validatedParentNumber,
        parentNumber2: validatedParentNumber2,
        password: validatedPassword,
        class: validatedClass
    };

    // save the user to the database
    const user = new User(newUser);
    const savingResult = await user.save()

	return res.json({res: savingResult});

});

module.exports = router;