import dbConnect from "../../utils/dbConnect"; 
import Categoria from '../../models/Categoria';
import Restaurante from "../../models/Restaurante";
import middlewareAuth from '../../middlewares/auth';
import Produto from '../../models/Produto';


dbConnect();

const handler = async(req, res) => {
    const{ query: { idRestaurante }, method } = req;

    switch(method){
        case 'GET':
            try{

                let cardapio = [];
                let produtos;
                const categoriaDado = await Categoria.find({restaurante: idRestaurante});
                cardapio = categoriaDado.map(function(dados) { 
                    produtos =  Produto.find({restaurante: idRestaurante, categoria: dados._id});
                    const a = produtos.then(function(resultado) {
                        return resultado.nome;
                    })
                    console.log(a);
                    return {categoria: {nome: dados.nome}}
                    
                })
                return res.status(200).json({success: true, cardapio: cardapio});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao obter categoria! ${error}`});
            }
            break;
        default:
            return res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }   
}
export default middlewareAuth(handler);