import jwt from 'jsonwebtoken';

export function gerarToken(params = {}){
     return jwt.sign(params, process.env.SECRET, {
        expiresIn: 86400,
    });
}