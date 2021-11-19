import jwt from 'jsonwebtoken';

function gerarToken(params = {}){
     return jwt.sign(params, process.env.SECRET, {
        expiresIn: 86400,
    });
}

export default gerarToken;