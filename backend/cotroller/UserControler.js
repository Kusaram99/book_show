import UserModel from '../model/User.js'; 
import jwt from 'jsonwebtoken'; 




// signup rout
const signUp = async (req, res) => {
    try {
        const { firstname, lastname, email, password, image } = req.body;

        // Check if a user with the same email exists
        const existingUser = await UserModel.findOne({ email: req.body.email });

        if (existingUser) {
            // User with the same email already exists
            return res.status(409).json({ message: 'Email is already in use 😔' });
        }

        const newUser = new UserModel({ firstname, lastname, email, password, image });

        // Save the new user to the database
        await newUser.save();

        // Generate a JWT token
        jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.SCRETKEY, { expiresIn: '3h' }, (err, token) => {
            if (err) {
                return res.status(401).json({ message: "Something is error with server!" });
            }
            // Registration and token generation successful
            const { firstname, email, image, _id } = newUser;
            const data = {
                firstname,
                email,
                image,
                _id,
                message: "Registration and token generation successful 😃"
            }
            // send response
            return res.status(201).json({ data, token });
        });
    } catch (error) {
        // Handle other errors  
        console.log(error)
        return res.status(500).json({ message: 'Internal server error 🤔' });
    }
}

// login rout
const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user is old user
        const userData = await UserModel.findOne({ email, password });

        if (userData) {
            // Password is valid, generate a JWT token for authentication   
            jwt.sign({ userId: userData._id }, process.env.SCRETKEY, { expiresIn: '3h' }, (err, token) => {
                if (err) {
                    return res.status(401).json({ message: "Something is error with server!" });
                }
                const { firstname, email, image, _id } = userData;
                const data = {
                    firstname,
                    email,
                    image,
                    _id,
                    message: "Login successful 😃"
                }
                return res.status(201).json({ data, token });
            });

        } else {
            // No matching user found
            return res.status(401).json({ message: "Invalid email or password 😔" });
        }

    } catch (err) {
        return res.status(500).json({ message: "Server error 500 😞" });
    }
}

export { signUp, logIn };