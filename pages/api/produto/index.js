import dbConnect from "../../../utils/dbConnect"; 
import Produto from '../../../models/Produto';
import Restaurante from "../../../models/Restaurante";
import middlewareAuth from '../../../middlewares/auth';

dbConnect();

const handler = async(req, res) => {
    const { method } = req;
    switch(method){
        case 'GET':
            try{
                const produtos = await Produto.find();
                res.status(200).json({success: true, produtos: produtos})
            }catch(error){
                res.status(400).json({success: false, message: `Falha na obter produtos! ${error}`});
            }
            break;
        case 'POST':
            try{
                console.log(req.body.categoria);
                const produto = await Produto.create({...req.body, restaurante: req.body.restaurante, categoria: req.body.categoria});
                res.status(201).json({success: true, produto: produto})
            }catch(error){
                res.status(400).json({success: false, message: `Falha na criação do produto! ${error}`});
            }
            break;
        default:
            res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }
}
export default middlewareAuth(handler);