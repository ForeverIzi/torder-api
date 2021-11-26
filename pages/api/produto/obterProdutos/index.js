import dbConnect from "../../../../utils/dbConnect"; 
import Produto from '../../../../models/Produto';
import Categoria from '../../../../models/Categoria';
import middlewareAuth from '../../../../middlewares/auth';


dbConnect();

const handler = async(req, res) => {
    const{  query: { categoria }, method } = req;

    switch(method){
        case 'GET':
            try{
                let produto;
                console.log(categoria);
                if(categoria)
                    produto = await Produto.find({categoria: categoria}).populate({ path: 'categoria', model: Categoria });
                else
                    produto = await Produto.find().populate({ path: 'categoria', model: Categoria });
                
                console.log(produto);
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