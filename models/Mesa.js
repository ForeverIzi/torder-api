const mongoose = require('mongoose');

const MesaSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: [true, 'Adicionar um nome'],
        maxlength: [50, 'Nome não pode conter mais que 50 caracteres'] 
    },
    quantidadeCadeiras:{
        type: Number,
        required: [true, 'Adicionar a quantidade de cadeiras'],
    },
    restaurante:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurante',
    }
})

module.exports = mongoose.models.Mesa || mongoose.model('Mesa',MesaSchema);