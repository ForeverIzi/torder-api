import dbConnect from "../../../utils/dbConnect"; 
import Mesa from '../../../models/Mesa';
import Restaurante from "../../../models/Restaurante";


dbConnect();

export default async(req, res) => {
    const{ query: { id }, method } = req;

    switch(method){
        case 'GET':
            try{
                const mesa = await Mesa.findById(id).populate({ path: 'restaurante', model: Restaurante });
                if(!mesa){
                    return res.status(400).json({success: false});
                }

                return res.status(200).json({success: true, mesa: mesa});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao obter mesa! ${error}`});
            }
            break;
        case 'PUT':
            try{
                const mesa = await Mesa.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if(!mesa){
                    return res.status(400).json({success: false, message: `Falha ao atualizar mesa! ${error}`});
                }
                return res.status(200).json({success: true, mesa: mesa});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao atualizar mesa! ${error}`});
            }
            break;
        case 'DELETE':
            try{
                const deletedMesa = await Mesa.deleteOne({ _id: id});
                if(!deletedMesa){
                    return res.status(400).json({success: false, message: `Falha ao remover mesa! ${error}`});
                }

                return res.status(200).json({success: true, mesa: {}});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao remover mesa! ${error}`});
            }
            break;
        default:
            return res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }   
}