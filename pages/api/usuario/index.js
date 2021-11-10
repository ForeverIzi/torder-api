import dbConnect from "../../../utils/dbConnect"; 
import Usuario from '../../../models/Usuario';
import Cliente from '../../../models/Cliente';
import Restaurante from "../../../models/Restaurante";

dbConnect();

export default async(req, res) => {
    const { method } = req;
    const { email } = req.body;

    switch(method){
        case 'GET':
            try{
                const usuarios = await Usuario.find({}).populate([ { path: 'cliente', model: Cliente }, { path: 'restaurante', model: Restaurante }]);
                res.status(200).json({success: true, usuarios: usuarios})
            }catch(error){
                res.status(400).json({success: false, message: `Falha ao obter Usuarios! ${error}`});
            }
            break;
        case 'POST':
            try{
                if(await Usuario.findOne({email}))
                    return res.send(400).json({success: false, message: "Email já cadastrado!"});

                const usuario = await Usuario.create(req.body);

                usuario.senha = undefined;

                res.status(201).json({success: true, usuario: usuario})
            }catch(error){
                res.status(400).json({success: false, message: `Falha ao cadastrar Usuario! ${error}`});
            }
            break;
        default:
            res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }
}