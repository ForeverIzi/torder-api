const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: [true, 'Adicionar o nome do produto'],
        maxlength: [50, 'Nome não pode conter mais que 50 caracteres'] 
    },
    descricao:{
        type: String,
        maxlength: [60, 'Nome não pode conter mais que 60 caracteres'],
    },
    preco:{
        type: Number,
        required: [true, 'Adicionar preço'],
    },
    restaurante:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurante',
        required: true,
    }
})

module.exports = mongoose.models.Produto || mongoose.model('Produto',ProdutoSchema);