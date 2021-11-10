import dbConnect from "../../../utils/dbConnect"; 
import Produto from '../../../models/Produto';
import Restaurante from "../../../models/Restaurante";

dbConnect();

export default async(req, res) => {
    const { method } = req;
    switch(method){
        case 'GET':
            try{
                const produtos = await Produto.find().populate({ path: 'restaurante', model: Restaurante });
                res.status(200).json({success: true, produtos: produtos})
            }catch(error){
                res.status(400).json({success: false, message: `Falha na obter produtos! ${error}`});
            }
            break;
        case 'POST':
            try{
                const produto = await Produto.create({...req.body, restaurante: req.body.restaurante});
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