import jwt from 'jsonwebtoken';

const auth = (handler) => {
    return async(req, res) => {
        const authHeader = req.headers.authorization;
        if(!authHeader)
            return res.status(401).send({error: 'Nenhum token informado!'})
        const parts = authHeader.split(' ');

        if(!parts.lengh === 2)
            return res.status(401).send({error: 'Token error!'});
        
            
        const [scheme,token] = parts;

        if(!/^Bearer$/i.test(scheme))
            return res.status(401).send({error: 'Token mal formatado!'});

        jwt.verify(token, process.env.SECRET, (error,decoded) => { 
            if(error) return res.status(401).send({error: 'Token inválido!'});

            req.usuarioId = decoded.id;

            return handler(req,res);
        }) 
    }
}
export default auth;