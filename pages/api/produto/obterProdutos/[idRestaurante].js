import dbConnect from "../../../../utils/dbConnect"; 
import Produto from '../../../../models/Produto';
import Categoria from '../../../../models/Categoria';
import middlewareAuth from '../../../../middlewares/auth';


dbConnect();

const handler = async(req, res) => {
    const{ query: { idRestaurante, categoria }, method } = req;

    switch(method){
        case 'GET':
            try{
                let produto;
                if(categoria)
                     produto = await Produto.find({restaurante: idRestaurante, categoria: categoria}).populate({ path: 'categoria', model: Categoria });
                else
                    produto = await Produto.find({restaurante: idRestaurante}).populate({ path: 'categoria', model: Categoria });
                
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