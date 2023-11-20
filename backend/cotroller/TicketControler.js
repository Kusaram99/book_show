import TicketModel from "../model/Tickets.js";



// new booking rout handler
const storeTickets = async (req, res) => { 
    try {
        // store tickets to database
        const result = new TicketModel(req.body);
        // finally save data to database
        await result.save(); 
        // create an object for send response
        const obj = {
            user_id: result.user_id,
            ticket_Data: result.ticket_Data,
            _id: result._id,
            message: "Tickets saved successfully😀"
        }
        // rending reponse
        return res.send(obj);
    } catch (err) {
        // server error
        console.log(err);
        return res.status(500).json({ message: "Server error 500 😞" })
    }
}

// last booking rout handler
const lastBookedTicket = async (req, res) => {
    try {
        const { user_id } = req.params; 
        // Find the last booking ticket for the specified user
        const lastBooking = await TicketModel.find({ user_id })

        // check is last booking data available
        if (lastBooking.length) { 
            res.json(lastBooking[lastBooking.length - 1]);
        } else {
            res.status(200).json(null);
        }
    } catch (error) {
        // error
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}


export { storeTickets, lastBookedTicket };