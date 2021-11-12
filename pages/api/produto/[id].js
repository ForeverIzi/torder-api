import dbConnect from "../../../utils/dbConnect"; 
import Produto from '../../../models/Produto';
import Restaurante from "../../../models/Restaurante";


dbConnect();

const handler = async(req, res) => {
    const{ query: { id }, method } = req;

    switch(method){
        case 'GET':
            try{
                const produto = await Produto.findById(id).populate({ path: 'restaurante', model: Restaurante });
                if(!produto){
                    return res.status(400).json({success: false});
                }

                return res.status(200).json({success: true, produto: produto});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao obter produto! ${error}`});
            }
            break;
        case 'PUT':
            try{
                const produto = await Produto.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if(!produto){
                    return res.status(400).json({success: false, message: `Falha ao atualizar produto! ${error}`});
                }
                return res.status(200).json({success: true, produto: produto});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao atualizar produto! ${error}`});
            }
            break;
        case 'DELETE':
            try{
                const deletedProduto = await Produto.deleteOne({ _id: id});
                if(!deletedProduto){
                    return res.status(400).json({success: false, message: `Falha ao remover produto! ${error}`});
                }

                return res.status(200).json({success: true, produto: {}});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao remover produto! ${error}`});
            }
            break;
        default:
            return res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }   
}
export default middlewareAuth(handler);