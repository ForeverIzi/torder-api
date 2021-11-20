const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: [true, 'Adicionar um nome'],
        maxlength: [50, 'Nome não pode conter mais que 50 caracteres'] 
    },
    cpf:{
        type: String,
        required: [true, 'Adicionar o CPF'],
        maxlength: [14, 'Nome não pode conter mais que 14 caracteres'],
        unique: true
    },
    email:{
        type: String,
        required: [true, 'Adicionar um email'],
        unique: true,
        lowercase: true
    },
    telefone:{
        type: String,
        required: [true, 'Adicionar um telefone'],
    }
})

module.exports = mongoose.models.Cliente || mongoose.model('Cliente',ClienteSchema);