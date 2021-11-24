const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: [true, 'Adicionar um nome'],
        maxlength: [50, 'Nome não pode conter mais que 50 caracteres'] 
    },
    restaurante:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurante',
    }
})

module.exports = mongoose.models.Categoria || mongoose.model('Categoria',CategoriaSchema);