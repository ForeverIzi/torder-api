import dbConnect from "../../../utils/dbConnect"; 
import Restaurante from '../../../models/Restaurante';
import middlewareAuth from '../../../middlewares/auth';

dbConnect();

const handler = async(req, res) => {
    const{ query: { id }, method } = req;

    switch(method){
        case 'GET':
            try{
                const restaurante = [await Restaurante.findById(id)];
                if(!restaurante){
                    return res.status(400).json({success: false,message: `Falha ao obter restaurante! ${error}`});
                }

                return res.status(200).json({success: true, restaurante: restaurante});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao obter restaurante! ${error}`});
            }
            break;
        case 'PUT':
            try{
                const restaurante = await Restaurante.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if(!restaurante){
                    return res.status(400).json({success: false, message: `Falha ao atualizar restaurante! ${error}`});
                }

                return res.status(200).json({success: true, restaurante: restaurante});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao atualizar restaurante! ${error}`});
            }
            break;
        case 'DELETE':
            try{
                const deletedRestaurante = await Restaurante.deleteOne({ _id: id});
                if(!deletedRestaurante){
                    return res.status(400).json({success: false, message: `Falha ao remover restaurante! ${error}`});
                }

                return res.status(200).json({success: true, restaurante: {}});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao remover restaurante! ${error}`});
            }
            break;
        default:
            return res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }   
}
export default middlewareAuth(handler);