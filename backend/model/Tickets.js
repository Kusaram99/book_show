import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    ticket_Data: {
        type: Object,
        required: true
    },
});

const TicketModel = mongoose.model('Tickets', ticketSchema);


export default TicketModel;