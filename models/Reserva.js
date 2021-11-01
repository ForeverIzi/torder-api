const mongoose = require('mongoose');

const ResevaSchema = new mongoose.Schema({
    data:{
        type: Date,
        default: Date.now 
    },
    mesa:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mesa',
    },
    cliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cliente',
    }
})

module.exports = mongoose.models.Reseva || mongoose.model('Reseva',ResevaSchema);