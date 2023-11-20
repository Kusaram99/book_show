import express from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';
// import User from '../model/User.js';
// import TicketModel from '../model/Tickets.js';
import { config } from 'dotenv';
import { logIn, signUp } from '../cotroller/UserControler.js';
import { storeTickets, lastBookedTicket } from '../cotroller/TicketControler.js';


config();

// create multer disk storage for image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage })

// create an instance of express application
const router = express.Router();

router.post('/register', upload.single('image'), signUp); 
router.post('/login', logIn);


// // user tickets rout
router.post('/storeTicket', storeTickets)

// find last booked ticket
router.get('/last-booking/:user_id', verifyToken, lastBookedTicket);


// Middleware for get token
function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.SCRETKEY, (err, valid) => {
            if (err) {
                console.log(err)
                res.status(401).send({ message: "Please login again because your token is expired 😇!" });
            } else {
                next();
            }
        });
    } else {
        res.status(403).send({ message: "Please add token with header" });
    }
}

export default router;


