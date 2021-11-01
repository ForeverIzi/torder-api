import dbConnect from "../../../utils/dbConnect"; 
import Mesa from '../../../models/Mesa';

dbConnect();

export default async(req, res) => {
    const{ query: { id }, method } = req;

    switch(method){
        case 'GET':
            try{
                const mesa = await Mesa.findById(id);
                if(!mesa){
                    return res.status(400).json({success: false});
                }

                return res.status(200).json({success: true, data: mesa});
            }catch(error){
                return res.status(400).json({success: false, massage: `Falha ao obter mesa! ${error}`});
            }
            break;
        case 'PUT':
            try{
                const mesa = await Mesa.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if(!mesa){
                    return res.status(400).json({success: false, massage: `Falha ao atualizar mesa! ${error}`});
                }
                return res.status(200).json({success: true, data: mesa});
            }catch(error){
                return res.status(400).json({success: false, massage: `Falha ao atualizar mesa! ${error}`});
            }
            break;
        case 'DELETE':
            try{
                const deletedMesa = await Mesa.deleteOne({ _id: id});
                if(!deletedMesa){
                    return res.status(400).json({success: false, massage: `Falha ao remover mesa! ${error}`});
                }

                return res.status(200).json({success: true, data: {}});
            }catch(error){
                return res.status(400).json({success: false, massage: `Falha ao remover mesa! ${error}`});
            }
            break;
        default:
            return res.status(400).json({success: false, massage: "Requisição inválida"});
            break;
    }   
}