import dbConnect from "../../../../utils/dbConnect"; 
import Produto from '../../../../models/Produto';
import Restaurante from "../../../../models/Restaurante";
import middlewareAuth from '../../../../middlewares/auth';


dbConnect();

const handler = async(req, res) => {
    const{ query: { idRestaurante, categoria }, method } = req;

    switch(method){
        case 'GET':
            try{
                const produto = await Produto.find({restaurante: idRestaurante, categoria: categoria});
                if(!produto){
                    return res.status(400).json({success: false});
                }

                return res.status(200).json({success: true, produto: produto});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao obter produto! ${error}`});
            }
            break;
        default:
            return res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }   
}
export default middlewareAuth(handler);