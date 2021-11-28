const mongoose = require('mongoose');
const moment = require('moment');

const ReservaSchema = new mongoose.Schema({
    horarioCiacao:{
        type: Date,
        default: Date.now 
    },
    horarioReserva: {
        type: Date,
    },
    status: {
        type: String},
    mesa:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mesa',
    },
    cliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
    }
})

ReservaSchema.pre('save', function(next){
    const data = Date.now();
    this.horarioReserva = moment(data).add(30, 'm').toDate();
    console.log(this.horarioReserva);
    next();
});

module.exports = mongoose.models.Reserva || mongoose.model('Reserva',ReservaSchema);