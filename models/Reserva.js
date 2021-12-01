const mongoose = require('mongoose');
const moment = require('moment');
const { DateTime } = require("luxon");

const ReservaSchema = new mongoose.Schema({
    horarioCriacao:{
        type: Date,
    },
    horarioReserva: {
        type: Date,
    },
    status: {
        type: String,
        default: 'Reservado'
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

ReservaSchema.pre('save', function(next){

    var local = DateTime.local().plus({hour: -3});
    var rezoned = local.setZone("America/Sao_Paulo");
    const dataAtual = rezoned;

    this.horarioReserva = dataAtual.plus({ minutes: 30 })
    this.horarioCriacao = dataAtual;
    next();
});

module.exports = mongoose.models.Reserva || mongoose.model('Reserva',ReservaSchema);