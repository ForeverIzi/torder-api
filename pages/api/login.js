import jwt from 'jsonwebtoken';

export default async(req, res) => {
    if(!req.body){
        return res.status(400).json({message: `Erro no login!`});
    }
    const { email, senha } = req.body;

    res.json({
        token: jwt.sign({
            
        })
    })
}