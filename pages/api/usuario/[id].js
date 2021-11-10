import dbConnect from "../../../utils/dbConnect"; 
import Usuario from '../../../models/Usuario';
import bcrypt from 'bcrypt';

dbConnect();

export default async(req, res) => {
    const{ query: { id }, method } = req;

    switch(method){
        case 'GET':
            try{
                const usuario = await Usuario.findById(id);
                if(!usuario){
                    return res.status(400).json({success: false});
                }

                return res.status(200).json({success: true, usuario: usuario});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao cadastrar usuário! ${error}`});
            }
            break;
        case 'PUT':
            try{
                
                const hash = await bcrypt.hash(req.body.senha,10);
                req.body.senha = hash;

                const usuario = await Usuario.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });

                if(!usuario){
                    return res.status(400).json({success: false, message: `Falha ao atualizar usuário!`});
                }

                return res.status(200).json({success: true, usuario: usuario});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao atualizar usuário! ${error}`});
            }
            break;
        case 'DELETE':
            try{
                const deletedUsuario = await Usuario.deleteOne({ _id: id});
                if(!deletedUsuario){
                    return res.status(400).json({success: false, message: `Falha ao remover usuário!`});
                }

                return res.status(200).json({success: true, Usuario: {}});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao remover usuário! ${error}`});
            }
            break;
        default:
            return res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }   
}