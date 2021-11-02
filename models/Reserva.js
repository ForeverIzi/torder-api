const mongoose = require('mongoose');

const ResevaSchema = new mongoose.Schema({
    data:{
        type: Date,
        default: Date.now 
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

module.exports = mongoose.models.Reseva || mongoose.model('Reseva',ResevaSchema);