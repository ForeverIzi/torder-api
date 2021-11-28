const mongoose = require('mongoose');
import bcrypt from 'bcrypt';

const UsuarioSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Adicionar usuário'],
        unique: true,
    },
    senha:{
        type: String,
        requeired: [true, 'Adicionar senha'],
        select: false
    },
    criadoEm:{
        type: Date,
        default: Date.now,
    },
    ehAdminRestuarante:{
        type: Boolean,
        default: false,
    },
    restaurante:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurante',
    },
    cliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
    }
});

UsuarioSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha,10);
    this.senha = hash;
});

module.exports = mongoose.models.Usuario || mongoose.model('Usuario',UsuarioSchema);