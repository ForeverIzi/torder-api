import dbConnect from "../../../utils/dbConnect"; 
import Mesa from '../../../models/Mesa';

dbConnect();

export default async(req, res) => {
    const { method } = req;
    switch(method){
        case 'GET':
            try{
                const mesas = await Mesa.find();
                res.status(200).json({success: true, data: mesas})
            }catch(error){
                res.status(400).json({success: false, massage: `Falha na obter mesas! ${error}`});
            }
            break;
        case 'POST':
            try{
                const mesa = await Mesa.create({...req.body, restaurante: req.body.restaurante, cliente: req.body.cliente});
                res.status(201).json({success: true, data: mesa})
            }catch(error){
                res.status(400).json({success: false, massage: `Falha na criação do mesa! ${error}`});
            }
            break;
        default:
            res.status(400).json({success: false, massage: "Requisição inválida"});
            break;
    }
}