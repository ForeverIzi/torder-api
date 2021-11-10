import dbConnect from "../../../utils/dbConnect"; 
import Mesa from '../../../models/Mesa';
import Restaurante from "../../../models/Restaurante";

dbConnect();

export default async(req, res) => {
    const { method } = req;
    switch(method){
        case 'GET':
            try{
                const mesas = await Mesa.find().populate({ path: 'restaurante', model: Restaurante });
                res.status(200).json({success: true, mesas: mesas})
            }catch(error){
                res.status(400).json({success: false, message: `Falha na obter mesas! ${error}`});
            }
            break;
        case 'POST':
            try{
                const mesa = await Mesa.create({...req.body, restaurante: req.body.restaurante, cliente: req.body.cliente});
                res.status(201).json({success: true, mesa: mesa})
            }catch(error){
                res.status(400).json({success: false, message: `Falha na criação do mesa! ${error}`});
            }
            break;
        default:
            res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }
}