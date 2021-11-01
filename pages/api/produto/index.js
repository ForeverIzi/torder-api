import dbConnect from "../../../utils/dbConnect"; 
import Produto from '../../../models/Produto';

dbConnect();

export default async(req, res) => {
    const { method } = req;
    switch(method){
        case 'GET':
            try{
                const Produtos = await Produto.find();
                res.status(200).json({success: true, data: Produtos})
            }catch(error){
                res.status(400).json({success: false, massage: `Falha na obter produtos! ${error}`});
            }
            break;
        case 'POST':
            try{
                const produto = await Produto.create({...req.body, restaurante: req.body.restaurante});
                res.status(201).json({success: true, data: produto})
            }catch(error){
                res.status(400).json({success: false, massage: `Falha na criação do produto! ${error}`});
            }
            break;
        default:
            res.status(400).json({success: false, massage: "Requisição inválida"});
            break;
    }
}