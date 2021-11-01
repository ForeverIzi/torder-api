const mongoose = require('mongoose');

const RestauranteSchema = new mongoose.Schema({
    nomeFantasia:{
        type: String,
        required: [true, 'Adicionar um nome Fantasia'],
        maxlength: [50, 'Nome não pode conter mais que 50 caracteres'] 
    },
    razaoSocial:{
        type: String,
        required: [true, 'Adicionar um razão social'],
        maxlength: [50, 'Nome não pode conter mais que 50 caracteres'],
        unique: true
    },
    cnpj:{
        type: String,
        required: [true, 'Adicionar cpnj'],
        unique: true
    },
    email:{
        type: String,
        required: [true, 'Adicionar email'],
        unique: true
    },

    especialidade: {
        type: String,
    },

    endereco:{
        endereco: {
            type: String,
        },
        numero: {
            type: String,
        },
        complemento: {
            type: String,
        }
    },
    telefones: {
        telefone1: {
            type: String,
        },
        telefone2: {
            type: String,
        },
    }
        
})

module.exports = mongoose.models.Restaurante || mongoose.model('Restaurante',RestauranteSchema);