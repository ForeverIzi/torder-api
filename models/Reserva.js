const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
    horarioCiacao:{
        type: Date,
        default: Date.now 
    },
    horarioReserva: {
        type: Date,
    },
    mesa:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mesa',
    },
    cliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
    }
})

module.exports = mongoose.models.Reserva || mongoose.model('Reserva',ReservaSchema);