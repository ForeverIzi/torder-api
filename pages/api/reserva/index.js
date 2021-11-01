import dbConnect from "../../../utils/dbConnect"; 
import Reserva from '../../../models/Reserva';

dbConnect();

export default async(req, res) => {
    const { method } = req;
    switch(method){
        case 'GET':
            try{
                const reservas = await Reserva.find();
                res.status(200).json({success: true, data: reservas})
            }catch(error){
                res.status(400).json({success: false, massage: `Falha na obter reservas! ${error}`});
            }
            break;
        case 'POST':
            try{
                const reserva = await Reserva.create({...req.body, restaurante: req.body.restaurante});
                res.status(201).json({success: true, data: reserva})
            }catch(error){
                res.status(400).json({success: false, massage: `Falha na criação do reserva! ${error}`});
            }
            break;
        default:
            res.status(400).json({success: false, massage: "Requisição inválida"});
            break;
    }
}