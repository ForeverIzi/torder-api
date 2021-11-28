import dbConnect from "../../../utils/dbConnect"; 
import Categoria from '../../../models/Categoria';
import Restaurante from "../../../models/Restaurante";
import middlewareAuth from '../../../middlewares/auth';


dbConnect();

const handler = async(req, res) => {
    const{ query: { id }, method } = req;

    switch(method){
        case 'GET':
            try{
                const categoria = [await Categoria.findById(id).populate({ path: 'restaurante', model: Restaurante })];
                if(!categoria){
                    return res.status(400).json({success: false});
                }

                return res.status(200).json({success: true, categoria: categoria});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao obter categoria! ${error}`});
            }
            break;
        case 'PUT':
            try{
                const categoria = await Categoria.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if(!categoria){
                    return res.status(400).json({success: false, message: `Falha ao atualizar categoria! ${error}`});
                }
                return res.status(200).json({success: true, categoria: categoria});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao atualizar categoria! ${error}`});
            }
            break;
        case 'DELETE':
            try{
                const deletedMesa = await Categoria.deleteOne({ _id: id});
                if(!deletedMesa){
                    return res.status(400).json({success: false, message: `Falha ao remover categoria! ${error}`});
                }

                return res.status(200).json({success: true, categoria: {}});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao remover categoria! ${error}`});
            }
            break;
        default:
            return res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }   
}
export default middlewareAuth(handler);